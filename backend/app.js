
const express = require('express');
const cors = require('cors');
const userModel = require('./models/UserData');
const courseModel = require('./models/CourseData');
require('./connection');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());
const UserData = require('./models/UserData')
async function validateUser(email, password, userType) {
  try {
      const user = await UserData.findOne({ userEmailId: email });
      if (!user) {
          return { valid: false, message: 'User not found' };
      }

      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
          return { valid: false, message: 'Incorrect password' };
      }

      if (user.userType !== userType) {
          return { valid: false, message: 'Invalid user type' };
      }

      return { valid: true, user };
  } catch (error) {
      return { valid: false, message: 'Error during validation', error };
  }
}

app.get('/userdata', async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// app.get('/user', async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ error: 'Email is required' });
//   }

//   try {
//     const user = await UserData.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json({
//       userName: user.userName,
//       courses: user.courses
//     });
//   } catch (err) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

app.get('/user', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const user = await UserData.findOne({ userEmailId: email }); // Change to userEmailId
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      userName: user.userName,
      courses: user.courses || [] // Ensure courses is an array
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/adduser', async (req, res) => {
  try {
    const item = req.body;
    const data_add = new userModel(item);
    await data_add.save();
    res.send('Post successful');
  } catch (error) {
    console.log(error);
  }
});

app.put('/edituser/:id', async (req, res) => {
  try {
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.send('Updated successfully');
  } catch (error) {
    console.log(error);
  }
});

app.delete('/deleteuser/:id', async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.send('Deleted successfully');
  } catch (error) {
    console.log(error);
  }
});

// Unified Login
app.post('/login', async (req, res) => {
  const { userEmailId, userPassword } = req.body;

  try {
    const user = await userModel.findOne({ userEmailId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Return the user's type along with a successful login response
    res.status(200).json({
      userType: user.userType,
      userName: user.userName,
      token: jwt.sign({ id: user._id, userType: user.userType }, 'your_jwt_secret', { expiresIn: '1h' })
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Unified Signup
app.post('/signup', async (req, res) => {
  const { userName, userEmailId, userPassword, userPhoneNumber, userAddress, role } = req.body;

  if (!['student', 'instructor'].includes(role)) {
    return res.status(400).send('Invalid role');
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    // Create a new user
    const newUser = new userModel({
      userName,
      userEmailId,
      userPassword: hashedPassword,
      userPhoneNumber,
      userAddress,
      role,
    });

    // Save the new user in the database
    await newUser.save();
    res.status(201).send('${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).send('Error registering user');
  }
});
app.post('/check-email', async (req, res) => {
  try {
      const { email } = req.body;
      const user = await userModel.findOne({ userEmailId: email });
      if (user) {
          return res.json({ exists: true });
      }
      return res.json({ exists: false });
  } catch (error) {
      res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/getcourses', async (req, res) => {
  try {
    const data = await courseModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.post('/addcourse',async(req,res)=>{
  try {
      var item=req.body;
      const data_add=new courseModel(item);
      const data=await data_add.save();
      res.send('Post sucessful')
  } catch (error) {
      console.log(error)
  }
})
// const router = express.Router();
// const UserData = require('./models/UserData'); 

// router.post('/authenticate', async (req, res) => {
//   const { email, password } = req.body;
  
//   try {
//     const user = await UserData.findOne({ userEmailId: email });
    
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }
    
//     res.json({
//       userType: user.userType
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });
app.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ userEmailId: email });

    // If user not found or userType doesn't match, return error
    if (!user || !(await bcrypt.compare(password, user.userPassword))) {
      return res.status(400).json({ message: 'Invalid email, password, or userType' });
    }

    // If credentials are valid, return userType
    res.status(200).json({ userType: user.userType });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log('Server is running on PORT 8000');
});

// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const User = require('./models/UserData');
// const Course = require('./models/CourseData');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/your-database', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Signup route
// app.post('/signup', async (req, res) => {
//     const { userName, userEmailId, userPassword, userPhoneNumber, userAddress, userType } = req.body;
    
//     if (!['Student', 'Instructor'].includes(userType)) {
//         return res.status(400).send('Invalid userType');
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(userPassword, 10);
//         const newUser = new User({
//             userName,
//             userEmailId,
//             userPassword: hashedPassword,
//             userPhoneNumber,
//             userAddress,
//             userType
//         });

//         await newUser.save();
//         res.status(201).send('User registered successfully');
//     } catch (error) {
//         if (error.code === 11000) {
//             res.status(400).send('Email already exists');
//         } else {
//             console.error('Error registering user:', error);
//             res.status(500).send('Error registering user');
//         }
//     }
// });

// // Login route
// app.post('/login', async (req, res) => {
//     const { userEmailId, userPassword } = req.body;

//     try {
//         const user = await User.findOne({ userEmailId });

//         if (!user || !(await user.comparePassword(userPassword))) {
//             return res.status(401).send('Invalid credentials');
//         }

//         const token = jwt.sign(
//             { userId: user._id, userType: user.userType },
//             'your_jwt_secret',
//             { expiresIn: '1h' }
//         );

//         res.status(200).json({ token });
//     } catch (error) {
//         console.error('Error logging in user:', error);
//         res.status(500).send('Error logging in user');
//     }
// });

// // Middleware to authenticate JWT
// const authenticateJWT = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) return res.status(401).send('Access denied');

//     jwt.verify(token, 'your_jwt_secret', (err, user) => {
//         if (err) return res.status(403).send('Forbidden');
//         req.user = user;
//         next();
//     });
// };

// // Protected route to get user data
// app.get('/user', authenticateJWT, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         if (!user) return res.status(404).send('User not found');
//         res.json(user);
//     } catch (error) {
//         console.error('Error fetching user data:', error);
//         res.status(500).send('Error fetching user data');
//     }
// });

// // Route to check if email exists
// app.post('/check-email', async (req, res) => {
//   try {
//       const { email } = req.body;
//       // Check if email is provided
//       if (!email) {
//           return res.status(400).send('Email is required');
//       }
//       // Query the database to find if the email exists
//       const user = await User.findOne({ userEmailId: email });
//       // Return a response based on the result
//       res.json({ exists: !!user });
//   } catch (error) {
//       console.error('Error checking email:', error);
//       res.status(500).send('Error checking email');
//   }
// });


// // Routes for courses
// app.get('/getcourses', async (req, res) => {
//     try {
//         const courses = await Course.find();
//         res.json(courses);
//     } catch (error) {
//         console.error('Error fetching courses:', error);
//         res.status(500).send('Error fetching courses');
//     }
// });

// app.post('/addcourse', async (req, res) => {
//     try {
//         const course = new Course(req.body);
//         await course.save();
//         res.status(201).send('Course added successfully');
//     } catch (error) {
//         console.error('Error adding course:', error);
//         res.status(500).send('Error adding course');
//     }
// });

// const PORT = 8000;
// app.listen(PORT, () => {
//     console.log(`Server is running on PORT ${PORT}`);
// });

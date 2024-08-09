// const express=require('express')
// const app=new express();
// require('./connection');
// const cors=require('cors')
// app.use(cors());

// const userModel=require('./models/UserData');

// app.use(express.json());

// app.get('/user',async(req,res)=>{
//     try {
//         const data=await userModel.find();
//         res.send(data);
//     } catch (error) {
//         console.log(error)
//     }
// })
// app.post('/adduser',async(req,res)=>{
//     try {
//         var item=req.body;
//         const data_add=new userModel(item);
//         const data=await data_add.save();
//         res.send('Post sucessful')
//     } catch (error) {
//         console.log(error)
//     }
// })
// app.put('/edituser/:id',async(req,res)=>{
//     try {
//         const data=await userModel.findByIdAndUpdate(req.params.id,req.body)
//         res.send('Updated Sucessfully')
//     } catch (error) {
//         console.log(error)
//     }
// })
// app.delete('/deleteuser/:id',async(req,res)=>{
//     try {
//         const data=await userModel.findByIdAndDelete(req.params.id)
//         res.send('Deleted sucessfully')
//     } catch (error) {
//         console.log(error)
//     }
// })

// const express=require('express')
// const app=new express();
// const cors=require('cors');
// require('./connectionc');
// const courseModel=require('./model/CourseData');
// app.use(express.json());
// app.use(cors());
// app.get('/getcourses',async(req,res)=>{
//     try {
//         const data=await CourseData.find()
//         res.send(data);
//     } catch (error) {
//         console.log(error);
        
//     }
// })
// app.listen(800,()=>{
//     console.log('Server is running on PORT 800')
// })
// // app.listen(4000,()=>{
// //         console.log('Server is running on PORT 4000');
// //     })


// const express = require('express');
// const cors = require('cors');
// const userModel = require('./models/UserData');
// const courseModel = require('./models/CourseData');
// require('./connection');
// // require('./connectionc');
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get('/user', async (req, res) => {
//   try {
//     const data = await userModel.find();
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post('/adduser', async (req, res) => {
//   try {
//     const item = req.body;
//     const data_add = new userModel(item);
//     await data_add.save();
//     res.send('Post successful');
//   } catch (error) {
//     console.log(error);
//   }
// });


// app.put('/edituser/:id', async (req, res) => {
//   try {
//     await userModel.findByIdAndUpdate(req.params.id, req.body);
//     res.send('Updated successfully');
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.delete('/deleteuser/:id', async (req, res) => {
//   try {
//     await userModel.findByIdAndDelete(req.params.id);
//     res.send('Deleted successfully');
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get('/getcourses', async (req, res) => {
//   try {
//     const data = await courseModel.find();
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.listen(8000,()=>{
//     console.log('Server is running on PORT 8000')
// })
// const express = require('express');
// const cors = require('cors');
// const userModel = require('./models/UserData');
// const courseModel = require('./models/CourseData');
// require('./connection');
// // require('./connectionc');
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get('/user', async (req, res) => {
//   try {
//     const data = await userModel.find();
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post('/adduser', async (req, res) => {
//   try {
//     const item = req.body;
//     const data_add = new userModel(item);
//     await data_add.save();
//     res.send('Post successful');
//   } catch (error) {
//     if (error.code === 11000) {
//       // Duplicate key error
//       res.status(400).send('Email already exists');
//     } else {
//       console.log(error);
//       res.status(500).send('An error occurred');
//     }
//   }
// });

// app.put('/edituser/:id', async (req, res) => {
//   try {
//     await userModel.findByIdAndUpdate(req.params.id, req.body);
//     res.send('Updated successfully');
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.delete('/deleteuser/:id', async (req, res) => {
//   try {
//     await userModel.findByIdAndDelete(req.params.id);
//     res.send('Deleted successfully');
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get('/getcourses', async (req, res) => {
//   try {
//     const data = await courseModel.find();
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.listen(8000, () => {
//   console.log('Server is running on PORT 8000');
// });

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

app.get('/user', async (req, res) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
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
  const { userEmailId, userPassword, role } = req.body;

  if (!['student', 'instructor'].includes(role)) {
    return res.status(400).send('Invalid role');
  }

  try {
    const user = await userModel.findOne({ userEmailId, role });

    if (!user) {
      return res.status(404).send('${role.charAt(0).toUpperCase() + role.slice(1)} not found');
    }

    const isPasswordValid = await bcrypt.compare(userPassword, user.userPassword);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send('Error logging in user');
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
app.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ userEmailId: email, userPassword: password });
    if (user) {
      res.json({ userType: user.userType });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});
const PORT = 8000;
app.listen(PORT, () => {
  console.log('Server is running on PORT ${PORT}');
});
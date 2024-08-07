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


const express = require('express');
const cors = require('cors');
const userModel = require('./models/UserData');
const courseModel = require('./models/CourseData');
require('./connection');
// require('./connectionc');
const app = express();
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

app.get('/getcourses', async (req, res) => {
  try {
    const data = await courseModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

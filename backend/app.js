const express=require('express')
const app=new express();
require('./connection');
const cors=require('cors')
app.use(cors());

const studentModel=require('./models/StudentData')
app.use(express.json());

app.get('/student',async(req,res)=>{
    try {
        const data=await studentModel.find();
        res.send(data);
    } catch (error) {
        console.log(error)
    }
})
app.post('/addstudent',async(req,res)=>{
    try {
        var item=req.body;
        const data_add=new studentModel(item);
        const data=await data_add.save();
        res.send('Post sucessful')
    } catch (error) {
        console.log(error)
    }
})
app.put('/editstudent/:id',async(req,res)=>{
    try {
        const data=await studentModel.findByIdAndUpdate(req.params.id,req.body)
        res.send('Updated Sucessfully')
    } catch (error) {
        console.log(error)
    }
})
app.delete('/deletestudent/:id',async(req,res)=>{
    try {
        const data=await studentModel.findByIdAndDelete(req.params.id)
        res.send('Deleted sucessfully')
    } catch (error) {
        console.log(error)
    }
})


app.listen(800,()=>{
    console.log('Server is running on PORT 800')
})
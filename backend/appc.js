// const express=require('express')
// const app=new express();
// const cors=require('cors');
// require('./connectionc');
// const courseModel=require('./model/CourseData');
// app.use(express.json());
// app.use(cors());


// app.post('/coursedata',async(req,res)=>{
//     try {
//       var item=req.body;
//       const data_add=new courseModel(item);
//       const data=await data_add.save();
//       res.send('Post successful')  
//     } catch (error) {
//         console.log(error)
        
//     }
// })
// //to get
// app.get('/getcourses',async(req,res)=>{
//     try {
//         const data=await courseModel.find()
//         res.send(data);
//     } catch (error) {
//         console.log(error);
        
//     }
// })
// //update operation
// app.put('/editcourses/:id',async(req,res)=>{
//     try {
//         const data=await courseModel.findByIdAndUpdate(req.params.id,req.body)
//         res.send('Update successful')
//     } catch (error) {
//         console.log(error)
        
//     }
// })
// //delete operation
// app.delete('/deletecourses/:id',async(req,res)=>{
//     try {
//         const data=await courseModel.findByIdAndDelete(req.params.id);
//         res.send('delete successful')
//     } catch (error) {
//         console.log(error)
//     }
// })




// app.listen(4000,()=>{
//     console.log('Server is running');
// })
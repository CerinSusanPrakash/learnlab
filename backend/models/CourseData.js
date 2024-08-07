// const mongoose=require('mongoose')
// const courseSchema=mongoose.Schema({
//     title:String,
//     description:String,
//     category:String,
//     imgURL:String,
    
// })
// const CourseData=mongoose.model('elearnlab',courseSchema)
// module.exports=CourseData;
const mongoose=require('mongoose');
const courseSchema=mongoose.Schema({
    title:String,
    description:String,
    category:String,
    imageurl:String
})
const CourseData=mongoose.model('elearnlab',courseSchema);
module.exports=CourseData;
const mongoose=require('mongoose')
const studentSchema=mongoose.Schema({
    studentName:String,
    studentEmailId:String,
    studentPhoneNumber:Number,
    studentPassword:String,
    studentAddress:String
})
const StudentData=mongoose.model('student',studentSchema)
module.exports=StudentData;
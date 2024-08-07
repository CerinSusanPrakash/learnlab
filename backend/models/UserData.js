const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    userName:String,
    userEmailId:{type: String ,required: true},
    userPhoneNumber:Number,
    userPassword:String,
    userAddress:String,
    userType:String
})
const UserData=mongoose.model('user',userSchema)
module.exports=UserData;
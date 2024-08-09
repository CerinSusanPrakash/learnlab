// const mongoose=require('mongoose')
// const userSchema=mongoose.Schema({
//     userName:String,
//     userEmailId:{type: String ,required: true,unique: true},
//     userPhoneNumber:Number,
//     userPassword:String,
//     userAddress:String,
//     userType:String
// })
// const UserData=mongoose.model('user',userSchema)
// module.exports=UserData;

const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    userName:{ type: String, required: true },
    userEmailId: { type: String, required: true, unique: true },
    userPassword:{ type: String, required: true },
    userPhoneNumber:{ type: String },
    userAddress:{ type: String },
    userType:{ type: String, required: true },
})
userSchema.index({ userEmailId: 1 }, { unique: true });
const UserData=mongoose.model('user',userSchema)
module.exports=UserData;
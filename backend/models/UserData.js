// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     userName: { type: String, required: true },
//     userEmailId: { type: String, required: true, unique: true },
//     userPassword: { type: String, required: true },
//     userPhoneNumber: { type: String },
//     userAddress: { type: String },
//     userType: { type: String, required: true }, // Can be 'Student' or 'Instructor'
// });

// // Ensure that the userEmailId is unique
// userSchema.index({ userEmailId: 1 }, { unique: true });

// const UserData = mongoose.model('user', userSchema);

// module.exports = UserData;

// const mongoose=require('mongoose')
// const userSchema=mongoose.Schema({
//     userName:{ type: String, required: true },
//     userEmailId: { type: String, required: true, unique: true },
//     userPassword:{ type: String, required: true },
//     userPhoneNumber:{ type: String },
//     userAddress:{ type: String },
//     userType:{ type: String, required: true },
// })
// userSchema.index({ userEmailId: 1 }, { unique: true });
// const UserData=mongoose.model('user',userSchema)
// module.exports=UserData;



// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = mongoose.Schema({
//     userName: { type: String, required: true },
//     userEmailId: { type: String, required: true, unique: true },
//     userPassword: { type: String, required: true },
//     userPhoneNumber: { type: String },
//     userAddress: { type: String },
//     userType: { type: String, required: true, enum: ['Student', 'Instructor'] },
// });

// userSchema.pre('save', async function (next) {
//     if (this.isModified('userPassword')) {
//         const salt = await bcrypt.genSalt(10);
//         this.userPassword = await bcrypt.hash(this.userPassword, salt);
//     }
//     next();
// });

// userSchema.methods.comparePassword = function (password) {
//     return bcrypt.compare(password, this.userPassword);
// };

// module.exports = mongoose.model('User', userSchema);




const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userName: String,
    userEmailId: { type: String, unique: true },
    userPassword: String,
    userPhoneNumber: String,
    userAddress: String,
    userType: String // 'Student' or 'Instructor'
});

// Password comparison method
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.userPassword);
};

const UserData = mongoose.model('UserData', userSchema);

module.exports = UserData;
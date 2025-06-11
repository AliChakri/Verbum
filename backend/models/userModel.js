
const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin"], 
        default: "user" 
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    otp: { 
        type: String 
    },
    passwordResetToken : { 
        type: String
    },
    passwordResetExpires : { 
        type: Date 
    },
}, { timestamps: true });


const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = UserModel;
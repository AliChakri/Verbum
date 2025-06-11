

const mongoose = require('mongoose');
const UserModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const transporter = require('../nodemailer');
const PostModel = require('../models/postModel');
require('dotenv').config();


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const register = async (req,res) => {

    const { name,email, password,role  } = req.body;
    
    if(!name || !email || !password){
        return res.json({success:false, message: 'Missing Details'});
    }

    try {
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.json({success: false, message: 'User Already Exist'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a verification token
        const verificationToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // Token expires in 1 day
        );

        const user = new UserModel({name, email, password: hashedPassword, role, isVerified: false});

        await user.save();

        // Send OTP via Email
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: `Email Verification`,
            html: ` <h1>Verify Your Email</h1>
                    <p>Click the link below to verify your email:</p>
                    <a href="http://localhost:5173/verify-email/${verificationToken}">
                    Verify Email</a>`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true ,message: "User registered. Check your email for Verification." });

    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

const verifyEmail = async (req, res) => {

    const { token } = req.params;

    if (!token) {
        return res.json({ success: false, message: 'Missing required fields' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid Token or user not found.' });
        }

        // Mark user as verified
        user.isVerified = true;
        await user.save();

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: `Welcome to AC Blogs`,
            html: ` <h1>AC Blogs</h1>
                    <p>If You're Searching for components or templates ..</p>`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Email verified successfully!" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const resendVerification = async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.isVerified) {
        return res.status(400).json({ success: false, message: "Email already verified" });
        }

        const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: `Email Verification - Resend`,
        html: `
            <h1>Verify Your Email</h1>
            <p>Click the link below to verify your email:</p>
            <a href="http://localhost:5173/verify-email/${verificationToken}">
            Verify Email</a>`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: "Verification email sent successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};



const login = async (req,res) => {

    const { email, password  } = req.body;
    if(!email || !password){
        return res.json({success:false, message: 'Email and Password are Required'});
    }

    try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({success:false, message: 'Email Invalid'});
        }

        if(!user.isVerified){
            return res.status(401).json({ success:false, message: 'Unauthorized Verify Your Email First'});
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if(!isMatched){
            return res.status(400).json({success:false, message: 'Invalid Password'});
        }
        const token = createToken(user._id);
    
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true, user});
        
        
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

const changeSettings = async (req, res) => {
    const { name, email, image } = req.body;
    const id = req.user._id;

    if (!email || !name) {
        return res.json({ success: false, message: 'Email and name are required' });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
        return res.status(400).json({ success: false, message: 'Email invalid' });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, email, image },
        { new: true }
        );

        return res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const logout = async (req,res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
        });

        return res.json({success: true, message: 'Logged Out'});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        // Store hashed token in DB
        user.passwordResetToken = hashedToken;
        user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 min expiry
        await user.save();

        // Send OTP via Email
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            html: `<h2>Click http://localhost:5173/reset-password/${resetToken} to reset your password.</h2>`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: 'Success' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const resetPassword = async (req,res) => {

    const { token, password } = req.body;

    if(!password || !token){
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
    }

    try {
        // Hash token to compare with DB
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await UserModel.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }, // Ensure token is not expired
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // Send confirmation email
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: user.email,
            subject: "Password Reset Successful",
            text: "Your password has been changed successfully. If you did not request this, please contact support immediately."
        };
        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Password reset successfully" });

    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //     if(err) {
    //         return res.status(400).json({success: false, message: "Error with token"})
    //     } else {
    //         bcrypt.hash(password, 10)
    //         .then(hash => {
    //             UserModel.findByIdAndUpdate({_id: id}, {password: hash})
    //             .then( async (u) => {
    //                 const mailOptions = {
    //                     from: process.env.SMTP_USER,
    //                     to: user.email,
    //                     subject: "Password Reset Successful",
    //                     text: "Your password has been changed successfully. If you did not request this, please contact support immediately."
    //                 };
    //                 await transporter.sendMail(mailOptions);
    //                 res.status(200).json({success: true, message: "Password Chneged"});
    //             })
    //             .catch(err => res.status(400).json({success: false, message: err.message}))
    //         })
    //         .catch(err => res.status(400).json({success: false, message: err.message}))
    //     }
    // })

    // try {
    //     const user = await UserModel.findOne({ email });
    //     if (!user) {
    //         return res.status(400).json({ success: false, message: 'User Not Found' });
    //     }
    //     if (user.otp !== otp ) {
    //         return res.status(400).json({ success: false, message: 'Invalid OTP' });
    //     }
    //     if (user.otpExpires < Date.now()) {
    //         return res.status(400).json({ success: false, message: 'OTP expired ' });
    //     }
    //     const hashedPassword = await bcrypt.hash(newPassword, 10);
    //     user.password = hashedPassword;
    //     user.otp = null;
    //     user.otpExpires = null;
    //     await user.save();
    //     res.json({ success: true, message: "Password reset successfully"});
    // } catch (error) {
    //     res.json({ success: false, message: error.message });
    // }
};



module.exports = {
    register,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changeSettings,
    resendVerification
}

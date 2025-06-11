
const express = require('express');
const cors =  require("cors");
const dotenv =  require('dotenv').config();
const cookieParser =  require('cookie-parser');
const mongoose =  require('mongoose');
const authRouter = require('./route/authRoute');
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const blogRouter = require('./route/blogRoute');
const passport = require('passport');
const {
    requireAuth,
    checkUser
} = require('./middleWare/userAuth')
const session = require('express-session');
const userAuth = require('./middleWare/userAuth');
const UserModel = require('./models/userModel');
const userRouter = require('./route/userRoute');
require("./middleWare/deleteUnverifiedUsers");

const app = express();
const port = process.env.PORT || 5000;


// MiddleWare
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173", // Frontend URL
        credentials: true, // Allow credentials (cookies, authorization headers)
    })
);
app.use("/uploads", express.static('uploads'));
app.use(session({
    secret: "shh",
    resave: false,
    saveUninitialized: true
}));

// API End Points
app.get('*');
app.use('/api/auth', authRouter);
app.use('/admin', blogRouter);
app.use('/user', userRouter);

// Connect To DB and Listeniong to REQS
mongoose.connect('mongodb://localhost:27017/Mern-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// ✅ Auto-create Admin if not exists
const createAdmin = async () => {
    const adminExists = await UserModel.findOne({ role: "admin" });
    if (!adminExists) {
    const hashedPassword = await bcrypt.hash(process.env.SMTP_PASS, 10);
    await UserModel.create({ name: "admin", email: process.env.SMTP_USER, password: hashedPassword, role: "admin" });
    console.log("Admin created: admin@example.com / admin123");
    console.log(hashedPassword);
    } else{
        return console.log('Admin Created');
    }
};
createAdmin();

app.listen(port, () => {
    console.log(`Listenng on Port://localhost:${port}`);
});





require('dotenv').config();
const jwt = require("jsonwebtoken");
const UserModel = require('../models/userModel');


// MIDDLEWARE TO PROTECT ROUTES (BACKEND)
const userAuth = async (req,res, next) => {
    
    const { token } = req.cookies;

    if(!token){
        return res.status(401).json({success: false, message: 'Not authorized Login Again'});
    }

    try {
        
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        if(tokenDecoded.id){
            req.body.userId = tokenDecoded.id;
        } else {
            return res.status(401).json({success: false, message: 'Not authorized Login Again'});
        }

        // ✅ Fetch user from DB & attach to req.user
        const user = await UserModel.findById(tokenDecoded.id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        res.json({success:false, message: error.message});
    }
}

// FUCNTION TO CHECK IF USER LOGGED OR EXIST (FRONTEND)
const checkUser = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.json({ user: null });
            } else {
                let user = await UserModel.findById(decodedToken.id);
                return res.json({ user: user });
            }
        });
    } else {
        return res.json({ user: null });
    }
    
};

//  MIDDLEWARE TO  PROTECT ADMIN ROUTES AND CHECK IF ADMIN LOGGED OR EXIST (FRONTEND + BACKEND)
const checkAdmin = async (req, res, next) => {

    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
    }
    else if(user.role !== "admin"){
        return res.status(403).json({ message: "Access denied!" });
    }
    else if(user.role === "admin"){
        next();
    }
};

module.exports = {
    userAuth,
    checkUser,
    checkAdmin
};
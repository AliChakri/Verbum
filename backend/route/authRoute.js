
const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken');
const {register,
        login,
        logout,
        verifyEmail,
        forgotPassword,
        resetPassword,
        changeSettings,
        resendVerification
} =require('../controllers/authController');
const { checkUser, userAuth, checkAdmin } = require('../middleWare/userAuth');



const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.get('/verify-email/:token', verifyEmail);
authRouter.post('/resend-verification', resendVerification);

authRouter.post('/login', login);
authRouter.post('/forgot-password', forgotPassword);
authRouter.post('/reset-password', resetPassword);

authRouter.get('/check-user', checkUser);
authRouter.get('/check-admin', userAuth, checkAdmin);
authRouter.get('/me', checkUser);
authRouter.post('/logout', logout);
authRouter.patch('/settings/edit', userAuth, changeSettings);






module.exports = authRouter;

require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for other ports
    auth: {
        user: process.env.SMTP_USER, // Fixed typo
        pass: process.env.SMTP_PASS, // Updated variable
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;
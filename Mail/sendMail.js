const nodemailer = require("nodemailer");
const { sequelize } = require("../Config/Config");
const db = require("../Models/index");
const OTP_verification = db.OTP_verification;


const sendOTPVerificationEmail = async (id,email) => {
try {
    let otp=   `${Math.floor(1000+Math.random()*9000)}`;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service : 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,         
        },  
    });
    // send mail with defined transport object
    let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: "OTP Verification",
        text: otp,
    };

    const data = await db.OTP_verification.create({
        user_id : id,
        email : email,
        otp : otp, // email is in lowercase
        expires_at : Date.now() + 3600000,
      });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
} catch (error) {
    console.log(error);
}
};
module.exports = sendOTPVerificationEmail

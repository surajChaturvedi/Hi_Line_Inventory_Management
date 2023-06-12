const nodemailer = require("nodemailer");
const { date } = require("joi");
const { otpVerificationServices } = require("../services");
const { sequelize } = require("../models");

//nodemailer stuff


const sendOTPVerificationEmail = async ({ id, email }, res) => {
  try {
    let otp = `${Math.floor(1000 + Math.random() * 9000)}`;

    // connect with smtp server
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    //Mail Options
    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Verify Your Email",
      html: `<p> Enter <b>${otp}</b> in the app to verify your email address </p> <p> This code <b>expires in 1 hour</b>`,
    };
    //console.log(email);
    //const dbTxn = await model.sequelize.transaction();

    const requestBody = {
      user_id: id,
      email: email,
      otp: otp,
      expires_at: Date.now() + 3600000,
    };

    // queryOptions = {
    //   transaction: dbTxn,
    // };

    const data = await otpVerificationServices.create(requestBody);
    
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log("its error", err);
      } else {
        res.json(
          //status: "PENDING",
          {
              userID: id,
              email: email,
              message: "Verification OTP email sent",
          },
        );
      }
    });
    console.log(`message sent ${data.messageId}`);
  } catch (error) {
    res.json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = sendOTPVerificationEmail;

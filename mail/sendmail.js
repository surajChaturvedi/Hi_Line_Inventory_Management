const nodemailer = require("nodemailer");
const { date } = require("joi");
const { otpVerification } = require("../services/OTPverification.services");


//nodemailer stuff

  // connect with smtp server
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: "shubhansu.c@copperdigital.com",
      pass: "Shubhansu@7",
    },
  });
  //};

  // Otp generation

  const sendOTPVerificationEmail = async ({ id, email }, res) => {
    try {
      let otp = `${Math.floor(1000 + Math.random() * 9000)}`;

      //Mail Options
      const mailOptions =({
        from: "shubhansu.c@copperdigital.com",
        to: email,
        subject: "Verify Your Email",
        html: `<p> Enter <b>${otp}</b> in the app to verify your email address </p> <p> This code <b>express in 1 hour</b>`,
      });
      console.log(email);
      const data = await otpVerification.create({
        user_id: id,
        OTP: otp,
        cretated_at: Date.now(),
        expires_at: Date.now() + 3600000,
      });

       transport.sendMail(mailOptions, (err) => {
        if (err) {
          console.log("its error", err);
        } else {
          res.json({
            //status: "PENDING",
            message: "Verification OTP email sent",
            data: {
              userID: id,
              email: email,
            },
          });
        }
      });
      comsole.log(`message sent ${data.messageId}`);
    } catch (error) {
      res.json({
        status: "FAILED",
        message: error.message,
      });
    }
  };

module.exports =  sendOTPVerificationEmail  ;

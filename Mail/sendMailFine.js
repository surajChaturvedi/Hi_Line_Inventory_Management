const nodemailer = require("nodemailer");

const userFine = async (email, Fine) => {
try {
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
        subject: "Alert Fine Impelmented",
        text: "Your fine is Impelmented Please pay the fine Of "+Fine,
    };

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
module.exports = userFine

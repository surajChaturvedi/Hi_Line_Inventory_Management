const express = require("express");
const router = express.Router();
const { register, login, verifyOtp } = require("../../../controllers/auth");
const {userPdf} = require('../../../pdfmaker/pdfmaker')
// const thePdfOutput = require('../../../pdfmaker/pdfmaker')

router.post("/register", register);

router.post("/login", login);

router.post("/verify", verifyOtp);

router.post("/resendOTPverification");

router.post("/login" , login);

router.get("/generateReport", userPdf);


// router.get('/detailspdf', thePdfOutput );

module.exports = router;

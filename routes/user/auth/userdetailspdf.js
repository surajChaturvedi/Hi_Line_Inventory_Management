const express = require("express");
const router = express.Router();
const {userPdf} = require('../../../pdfmaker/pdfmaker')


router.get("/generatereport", userPdf);


// router.get('/detailspdf', thePdfOutput );

module.exports = router;
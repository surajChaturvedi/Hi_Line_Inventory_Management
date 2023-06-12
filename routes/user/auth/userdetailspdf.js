const express = require("express");
const router = express.Router();
const {userPdf} = require('../../../pdfmaker/pdfmaker')


router.get("/generatereport", userPdf);



module.exports = router;
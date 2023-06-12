const express = require("express");
const router = express.Router();
const {
  userdetails,
  addBooks,
} = require("../../controllers/admin.userdetails");

router.post("/addbook", addBooks);

router.post("/userdetails/:id", userdetails);

// router.get('/detailspdf', thePdfOutput );

module.exports = router;

const express = require("express");
const router = require("express").Router();
const adminController = require("../../Controllers/adminController");

router.post("/register", adminController.register);
router.post("/login", adminController.login);
router.post("/addbook", adminController.addBook);
router.post("/booksearch", adminController.bookSearch);
router.get("/issuedbooks", adminController.issuedbooks);
 module.exports = router;
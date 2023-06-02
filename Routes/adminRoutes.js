const express = require("express");
const router = require("express").Router();
const adminController = require("../Controllers/adminController");

router.post("/admin/register", adminController.register);
router.post("/admin/login", adminController.login);
router.post("/admin/addbook", adminController.addBook);
router.get("/admin/booksearch", adminController.bookSearch);

module.exports = router;
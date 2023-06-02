const express = require("express");
const router = require("express").Router();
const userController = require("../Controllers/userController");
const adminController = require("../Controllers/adminController");

router.post("/user/register", userController.register);
router.post("/user/login",userController.login);
router.get("/user/booksearch", userController.bookSearch);
router.post("/user/issuebook", userController.issueBook);
router.get("/user/issuedbooks", userController.issuedbooks);

// router.post("/admin/login", adminController.login);


//app.post("/login", router.login);
//app.post("/register", router.register);

module.exports = router;
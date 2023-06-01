const express = require("express");
const router = require("express").Router();
const userController = require("../Controllers/userController");
const adminController = require("../Controllers/adminController");

router.post("/user/register", userController.register);
router.post("/user/login",userController.login);

// router.post("/admin/login", adminController.login);



//app.post("/login", router.login);
//app.post("/register", router.register);




module.exports = router;
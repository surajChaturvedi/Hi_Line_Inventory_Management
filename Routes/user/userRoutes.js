const express = require("express");
const router = require("express").Router();
const userController = require("../../Controllers/userController");

router.post("/register", userController.register);
router.post("/login",userController.login);
router.post("/verifyOTP",userController.verifyOTP);

module.exports = router;
const express = require("express");
const router = require("express").Router();
const userController = require("../Controllers/userController");

router.post("/register", userController.register);
router.post("/login",userController.login);

//app.post("/login", router.login);
//app.post("/register", router.register);

module.exports = router;
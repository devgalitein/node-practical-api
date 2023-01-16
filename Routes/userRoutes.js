const express = require("express");
const router = new express.Router();
const userController = require("../Controller/userController");
const { checkAuthentication } = require("../Middleware/checkAuth");
const { validate } = require("../Middleware/Validate");
const { checkSignUpData,checkSignInData } = require("../Validation/authValidation");

router.post("/signup",validate(checkSignUpData),(req,res)=> userController.signUp(req,res));
router.post("/signin",validate(checkSignInData),(req,res)=> userController.signIn(req,res));

module.exports = router;
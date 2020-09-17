const express = require("express");
const router = express.Router();
// import validators

// import controller
const { signup, signin } = require("../controllers/auth");
const { userSigninValidator } = require("../validator/signinValidators");
const { userSignupValidator } = require("../validator/signupValidator");

router.post("/signup", signup);
router.post("/signin", userSigninValidator, signin);

module.exports = router;

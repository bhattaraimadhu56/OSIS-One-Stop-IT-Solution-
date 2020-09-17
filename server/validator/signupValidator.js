exports.userSignupValidator = (req, res, next) => {
  req
    .check("cname")
    .notEmpty()
    .withMessage("Company Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Company Name must be between 3 and 50 characters")
    .exists()
    .withMessage("Name already exist , try other name");

  req
    .check("owner")
    .notEmpty()
    .withMessage("Company Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Company Name must be between 3 and 50 characters")
    .exists()
    .withMessage("Name already exist , try other name");

  req
    .check("website")
    .notEmpty()
    .withMessage("Website is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .exists()
    .withMessage("Website already exist , try other name");

  req
    .check("service")
    .notEmpty()
    .withMessage("Service is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .exists()
    .withMessage("Name already exist , try other name");

  req
    .check("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 3, max: 25 })
    .withMessage("Name must be between 3 and 25 characters")
    .exists()
    .withMessage("Name already exist , try other name");

  req
    .check("dob")
    .notEmpty()
    .withMessage("Established date is required")
    .exists()
    .withMessage("Name already exist , try other name");

  req
    .check("nzbn")
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 3, max: 25 })
    .withMessage("Name must be between 3 and 25 characters")
    .exists()
    .withMessage("Name already exist , try other name");
  req
    .check("email")
    .notEmpty()
    .withMessage("Email field is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .exists()
    .withMessage("Email address already exists");

  // other way to give error message without usign .withMessage()
  req.check("password", "Password is required").notEmpty();

  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    //must write regular expression between //
    // for strong password regular expression https://www.regextester.com/95447
    //
    // .matches(//)
    //.matches(/\d/)
    .matches(
      /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
    )
    .withMessage(
      "Password must contain at least 6 character with upper and lower case alphabet, number and special character"
    );
  // .custom(() => {
  //   // Can use normal arrow function if if false then will show error message
  //   // If password don't match then .withMessage("Password don't match plz use same password");
  //   //only in check('password') but not in all cases so we have to use req.body.
  //   if (req.body.password === req.body.confirmPassword) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // })
  // .withMessage("Password don't match plz use same password");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    res.json({ error: firstError });
  }
  next();
};

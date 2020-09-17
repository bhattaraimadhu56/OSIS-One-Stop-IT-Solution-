const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const bcrypt = require("bcrypt"); // for details how to use look example https://www.npmjs.com/package/bcrypt
const _ = require("lodash");
sendgrid;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.signup = (req, res) => {
  // console.log('REQ BODY ON SIGNUP', req.body);
  const {
    cname,
    owner,
    website,
    service,
    phone,
    dob,
    nzbn,
    email,
    username,
    password,
  } = req.body;

  let newUser = new User({
    cname,
    owner,
    website,
    service,
    phone,
    dob,
    nzbn,
    email,
    username,
    password,
  });
  // find whether email is already exist or not ?
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken, try another",
      });
    }
  }); // End of checking existing email

  //lets encrypt  (hash )the password
  // this method can be found in bcrypt npm package
  // we have use 10 instead of salt , you can pass any number to combine with hash password
  bcrypt.hash(newUser.password, 5, (err, hashPassData) => {
    // Store hash in your password DB.
    if (err) {
      res.json({
        message: "Something Wrong",
        error: err,
      });
    } // end of if
    else {
      newUser.password = hashPassData;
      console.log(hashPassData);
      // save information to database after hashing password successfully
      newUser.save((err, success) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          return res.status(200).json({
            message: "Successfully Registered, Plz signin for more info",
          });
        }
      });
    } // end of else
  }); // end of bcrypt function while hashing password
}; // end of exports.signup

exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  // without using exec
  User.findOne({ email }, (err, userData) => {
    //console.log(userData);
    // way to extract if doesn't work userData[0].email then simply use userData.email
    // console.log(userData[0].email);
    //console.log(userData.email);
    // if (err || !userData.length < 1) { // because user may contain empty array as well so that checking if less than 1
    if (err || !userData) {
      return res.json({
        error: "User with that email does not exist. Authorization  Fail",
      });
    } else {
      // iF found the data in User then only goes to else condition
      // if userData is found make sure the email and password match
      // For that we have to extract hash-password from userData to normal password
      // For that https://www.npmjs.com/package/bcrypt and use
      // Load hash from your password DB.
      // bcrypt.compare(myPlaintextPassword, hash, function(err, result) {// result == true});
      // we can get one data so index value is 0 , to get password==> userData[0].password

      bcrypt.compare(req.body.password, userData.password, (err, result) => {
        if (err) {
          res.json({ message: "Authorization Fail" });
        }
        // If result comes then
        if (result) {
          // Then with the correct name, email or password we have to generate the token
          // Token can be genertate from https://github.com/auth0/node-jsonwebtoken
          //jwt.sign(payload, secretOrPrivateKey, [options, callback])
          // const token = jwt.sign({object with your own data}, privateSecreteAnyKey,{you can pass expiration data and call back as weell} )
          const token = jwt.sign(
            //1st set your own data to send in token
            {
              t_id: userData._id,
              // t_name: userData.name,
              t_email: userData.email,
              t_role: userData.role,
            },
            //2nd you can get from .env file as well
            process.env.JWT_SECRET
            //3rd parameter optional but we can set expire date
            // {
            //     expiresIn: "1h"// token expires after 1 hour
            // }
          ); // End of jwt.token
          // send detail information in token in json format
          // After setting the token we can set cookie as well so at logout we can clear the cookie
          res.cookie("signCookie", token, { expire: new Date() + 1000 }); // i.e expire is 1000second from now
          // Destructure user data
          const { _id, name, email, role } = userData;

          res.json({
            message: "User Found ==> Login Successfull",
            token: token, // information like id, name and email are passed in the token
            // After successful login you can see in output
            //"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0X2lkIjoiNWVhMjBkZTk5ZGU4ZjkwZjBjMzM3NGEwIiwidF9uYW1lIjoicGFyYmF0aSIsInRfZWFtaWwiOiJwYXJiYXRpQGdtYWlsLmNvbSIsImlhdCI6MTU4NzY4MjQwOCwiZXhwIjoxNTg3Njg2MDA4fQ.6gNwFIX7VXhSlmpTntZnqdCWYRuisxs_61uudTNCWMk"
            // Can check by going to website https://jwt.io
            // we can also send user data here
            userData: { _id, name, email, role },
          });
        } // end of result
      }); // end of bcrypt.compare
    } // end of else
  }); // End of User.findOne
}; // End of Signin

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user._id
});

// For signout
exports.signout = (req, res) => {
  // we have set cookie in sign with name "signCookie" we can now clearCookie here in signout
  res.clearCookie("signCookie");
  res.json({ message: "Signout successly" });
}; // End of SignOut

exports.adminMiddleware = (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(400).json({
        error: "Admin resource. Access denied.",
      });
    }

    req.profile = user;
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist",
      });
    }

    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_RESET_PASSWORD,
      {
        expiresIn: "10m",
      }
    );

    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Password Reset link`,
      html: `
                <h1>Please use the following link to reset your password</h1>
                <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                <hr />
                <p>This email may contain sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `,
    };

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        console.log("RESET PASSWORD LINK ERROR", err);
        return res.status(400).json({
          error: "Database connection error on user password forgot request",
        });
      } else {
        sgMail
          .send(emailData)
          .then((sent) => {
            // console.log('SIGNUP EMAIL SENT', sent)
            return res.json({
              message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
            });
          })
          .catch((err) => {
            // console.log('SIGNUP EMAIL SENT ERROR', err)
            return res.json({
              message: err.message,
            });
          });
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function (
      err,
      decoded
    ) {
      if (err) {
        return res.status(400).json({
          error: "Expired link. Try again",
        });
      }

      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "Something went wrong. Try later",
          });
        }

        const updatedFields = {
          password: newPassword,
          resetPasswordLink: "",
        };

        user = _.extend(user, updatedFields);

        user.save((err, result) => {
          if (err) {
            return res.status(400).json({
              error: "Error resetting user password",
            });
          }
          res.json({
            message: `Great! Now you can login with your new password`,
          });
        });
      });
    });
  }
};
// exports.accountActivation = (req, res) => {
//   const { token } = req.body;

//   if (token) {
//     jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (
//       err,
//       decoded
//     ) {
//       if (err) {
//         console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
//         return res.status(401).json({
//           error: "Expired link. Signup again",
//         });
//       }

//       const { name, email, password } = jwt.decode(token);

//       const user = new User({ name, email, password });

//       user.save((err, user) => {
//         if (err) {
//           console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
//           return res.status(401).json({
//             error: "Error saving user in database. Try signup again",
//           });
//         }
//         return res.json({
//           message: "Signup success. Please signin.",
//         });
//       });
//     });
//   } else {
//     return res.json({
//       message: "Something went wrong. Try again.",
//     });
//   }
// };

const mongoose = require("mongoose");
const crypto = require("crypto");
// user schema
const userScheama = new mongoose.Schema(
  {
    cname: {
      type: String,
      trim: true,
      required: true,
      max: 100,
    },
    owner: {
      type: String,
      trim: true,
      required: true,
      max: 100,
    },
    website: {
      type: String,
      trim: true,
      required: true,
      max: 100,
    },
    service: {
      type: String,
      trim: true,
      required: true,
      max: 100,
    },
    phone: {
      type: Number,
      trim: true,
      required: true,
      //   max: 50,
    },
    dob: {
      type: Date,
      trim: true,
      required: true,
      //   max: 50,
    },
    nzbn: {
      type: String,
      trim: true,
      required: true,
      max: 50,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
      max: 50,
    },

    // hashed_password: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "subscriber",
    },
    // resetPasswordLink: {
    //   data: String,
    //   default: "",
    // },
  },
  { timestamps: true }
);

// // virtual
// userScheama
//   .virtual("password")
//   .set(function (password) {
//     this._password = password;
//     this.salt = this.makeSalt();
//     this.hashed_password = this.encryptPassword(password);
//   })
//   .get(function () {
//     return this._password;
//   });

// // methods
// userScheama.methods = {
//   authenticate: function (plainText) {
//     return this.encryptPassword(plainText) === this.hashed_password; // true false
//   },

//   encryptPassword: function (password) {
//     if (!password) return "";
//     try {
//       return crypto
//         .createHmac("sha1", this.salt)
//         .update(password)
//         .digest("hex");
//     } catch (err) {
//       return "";
//     }
//   },

//   makeSalt: function () {
//     return Math.round(new Date().valueOf() * Math.random()) + "";
//   },
// };

module.exports = mongoose.model("User", userScheama);

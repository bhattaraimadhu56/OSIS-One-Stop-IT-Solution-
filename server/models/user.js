const mongoose = require("mongoose");
// const crypto = require("crypto");
// user schema
const userScheama = new mongoose.Schema(
  {
    // rating: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Rating",
    // },
    // rating: [
    //   {
    //     rate: { type: Number, trim: true },
    //     comment: { type: String, trim: true },
    //   },
    // ],

    cname: {
      type: String,
      trim: true,
      required: true,
      // max: 100,
    },
    owner: {
      type: String,
      trim: true,
      required: true,
      // max: 100,
    },
    website: {
      type: String,
      trim: true,
      required: true,
      // max: 100,
    },
    service: {
      type: String,
      trim: true,
      required: true,
      // max: 100,
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
      // max: 100,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      // unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
      // max: 50,
    },

    latitude: {
      type: Number,
      trim: true,

      // max: 50,
    },
    longitude: {
      type: Number,
      trim: true,

      // max: 50,
    },

    ratingDetails: [
      {
        postedBy: {
          // type: Schema.Types.ObjectId,
          type: String,
          trim: true,
        },
        rate: {
          type: Number,
          trim: true,
        },
        comment: {
          type: String,
          trim: true,
        },
      },
    ],

    // hashed_password: {
    //   type: String,
    //   required: true,
    // },
    password: {
      type: String,
      required: true,
    },
    // salt: String,
    role: {
      type: String,
      default: "guest",
    },
    // resetPasswordLink: {
    //   data: String,
    //   default: "",
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userScheama);

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Schema = mongoose.Schema;
// mongoose.Promise = global.Promise;
// const { ObjectId } = mongoose.Schema.Types;
//const ObjectId = require("mongoose").Types.ObjectId;
// Schema
const ratingSchema = new mongoose.Schema(
  {
    ratingId: {
      type: Schema.Types.ObjectId,
      // just passing id doesnt related to any
    },

    postedBy: {
      type: Schema.Types.ObjectId,
      // type: String,
      ref: "User",
    },
    rate: {
      type: Number,
      trim: true,
      // required: true,
      // max: 100,
    },
    comment: {
      type: String,
      trim: true,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);

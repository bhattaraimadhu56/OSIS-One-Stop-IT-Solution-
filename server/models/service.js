const mongoose = require("mongoose");
// Schema
const serviceSchema = new mongoose.Schema(
  {
    service: {
      type: String,
      trim: true,
      required: true,
      // max: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);

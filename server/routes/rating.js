const express = require("express");

const router = express.Router();

// import controller methods
const {
  createRating,
  list,
  read,
  update,
  remove,
} = require("../controllers/rating");
const { requireSignin } = require("../controllers/auth");

router.get("/ratings", list);
router.get("/rating/:_id", read);
router.post("/rating/create", requireSignin, createRating);
router.put("/rating/:_id", requireSignin, update);
router.delete("/rating/:_id", requireSignin, remove);

module.exports = router;

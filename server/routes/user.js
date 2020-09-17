const express = require("express");

const router = express.Router();

// import controller methods
const { create, list, read, update, remove } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

// router.post("/post", requireSignin, create);
router.get("/users", list);
router.get("/user/:_id", read);
router.put("/user/:_id", requireSignin, update);
router.delete("/user/:_id", requireSignin, remove);

// router.get('/secret', requireSignin, (req, res) => {
//     res.json({
//         data: req.user.name
//     });
// });

module.exports = router;

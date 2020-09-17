const User = require("../models/user");
const slugify = require("slugify");

// exports.create = (req, res) => {
//     // console.log(req.body);
//     const { title, content, user } = req.body;
//     const slug = slugify(title);
//     // validate
//     switch (true) {
//         case !title:
//             return res.status(400).json({ error: 'Title is required' });
//             break;
//         case !content:
//             return res.status(400).json({ error: 'Content is required' });
//             break;
//     }
//     // create post
//     User.create({ title, content, user, slug }, (err, post) => {
//         if (err) {
//             console.log(err);
//             res.status(400).json({ error: 'Duplicate post. Try another title' });
//         }
//         res.json(post);
//     });
// };

exports.list = (req, res) => {
  User.find({})
    .limit(10)
    .sort({ createdAt: -1 })
    .exec((err, users) => {
      if (err) console.log(err);
      res.json(users);
    });
};

exports.read = (req, res) => {
  // console.log(req.pramas._id)
  const { _id } = req.params;
  User.findOne({ _id }).exec((err, user) => {
    if (err) console.log(err);
    res.json(user);
  });
};

exports.update = (req, res) => {
  console.log("All info of token", req.user);
  const { _id } = req.params;
  const {
    cname,
    owner,
    website,
    service,
    phone,
    dob,
    nzbn,
    email,
    password,
    ratingDetails,
  } = req.body;
  // console.log(req.body);
  User.findOneAndUpdate(
    { _id },
    {
      cname,
      owner,
      website,
      service,
      phone,
      dob,
      nzbn,
      email,
      password,
      ratingDetails,
    },
    { new: true }
  ).exec((err, user) => {
    if (err) console.log(err);
    res.json(user);
  });
};

exports.remove = (req, res) => {
  // console.log(req.pramas.slug)
  const { _id } = req.params;
  User.findOneAndRemove({ _id }).exec((err, user) => {
    if (err) console.log(err);
    res.json({
      message: "User deleted Successfully",
    });
  });
};

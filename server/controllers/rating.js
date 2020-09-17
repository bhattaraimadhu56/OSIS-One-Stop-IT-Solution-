const Rating = require("../models/rating");
exports.list = (req, res) => {
  // Rating.find()
  //   .populate("postedBy")
  //   .sort("-createdAt")
  //   .then((posts) => {
  //     res.json({ posts });
  //     console.log("Populating Data isd here", posts);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // Rating.find()
  //   .populate("postedBy")
  //   .exec((err, products) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: "Products not found",
  //       });
  //     }
  //     res.json(products);
  //     console.log("populating data... madhu ", products);
  //   });

  Rating.find({})
    .populate("postedBy", "_id owner")

    .limit(10)
    .sort({ createdAt: -1 })
    .populate("posteBy")

    .exec((err, ratings) => {
      if (err) console.log(err);
      console.log("Rating Populate Data ", ratings);
      res.json(ratings);
    });
  // var postData = Rating.find({});
  // postData.populate("postedBy").exec();
  // console.log("Rating Populate Data ", postData.populate("postedBy").exec());
};

exports.read = (req, res) => {
  // console.log(req.pramas._id)
  const { _id } = req.params;
  Rating.findOne({ _id }).exec((err, ratings) => {
    if (err) console.log(err);
    res.json(ratings);
  });
};

// Create Rating

exports.createRating = (req, res) => {
  console.log("REQ BODY ON Rating", req.body);
  console.log("What comes in req.user== token value will come ==>", req.user);
  // What comes in req.user== token value will come ==> {
  //   [0]   t_id: '5f098cd9115b4e0af85e5d48',
  //   [0]   t_email: 'admin@gmail.com',
  //   [0]   t_owner: 'Parbati 2',
  //   [0]   t_role: 'admin',
  //   [0]   iat: 1595586119,
  //   [0]   exp: 1595589719
  //   [0] }
  const { ratingId, rate, comment } = req.body;
  const { t_owner } = req.user;
  console.log(req.body);
  console.log("user==>", req.user.t_owner);
  console.log("user==>", req.user.t_id);

  let newRating = new Rating({
    // database name and value are different so we use key and value
    // user: req.user.t_owner, // Now while we comment or rate from frontend owner name will added to database
    // database name and value are same , when key and value are same use only one

    postedBy: req.user.t_id,
    ratingId,
    rate,
    comment,
  });

  newRating.save((err, success) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    } else {
      return res.status(200).json({
        message: "Rated Successfully",
      });
    }
  });
}; // end of exports.createRating

exports.update = (req, res) => {
  const { _id } = req.params;
  const { rate, comment } = req.body;
  console.log(req.body);
  Rating.findOneAndUpdate({ _id }, { rate, comment }, { new: true }).exec(
    (err, ratings) => {
      if (err) console.log(err);
      res.json(ratings);
    }
  );
};

exports.remove = (req, res) => {
  // console.log(req.pramas.slug)
  const { _id } = req.params;
  Rating.findOneAndRemove({ _id }).exec((err, ratings) => {
    if (err) console.log(err);
    res.json({
      message: "Rating deleted Successfully",
    });
  });
};

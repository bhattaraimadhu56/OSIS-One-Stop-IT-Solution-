const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// require("dotenv").config({ path: "ENV_FILENAME" });
const app = express();
//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// connect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR: ", err));

// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const ratingRoutes = require("./routes/rating");

// app middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors()); // allows all origins

// if ((process.env.NODE_ENV = "development")) {
//   app.use(cors({ origin: `http://localhost:3000` }));
// }

// middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", ratingRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});

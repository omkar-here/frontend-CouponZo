if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const path = require("path");
const crypto = require("crypto");
const express = require("express");
const app = express();
const cors = require("cors");
const { urlencoded } = require("body-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/User");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const couponRoutes = require("./routes/Coupon");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

app.use("/", userRoutes);
app.use("/coupon", couponRoutes);

module.exports = app;

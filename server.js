const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;
const passport = require("passport");
require("./config/passport")(passport);
const cors = require("cors");

// 連結mongoDB
mongoose
  // .connect(process.env.MONGODB_CONNECTION)
  .connect("mongodb://localhost:27017/mernDB")
  .then(() => {
    console.log("Connecting to mongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });

// moddleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// 使用route
app.use("/api/user", authRoute);

app.use("/public", courseRoute);

// course route應該被jwt保護
// 如果request header內部沒有jwt，則request就會被視為是unauthorized
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute
);

// 只有登入系統的人，才能夠去新增課程或是註冊課程
// jwt

app.listen(8080, () => {
  console.log("後端伺服器聆聽poet 8080...");
});

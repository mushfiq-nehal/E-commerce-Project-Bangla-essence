require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require('path');

const authController = require("./controllers/authController");


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_CONNECTION);

app.get("/", authController.getLogin);
app.post("/", authController.postLogin);
app.get("/signup", authController.getSignup);
app.post("/signup", authController.postSignup);
app.get("/verifyEmail", authController.getVerifyEmail);
app.post("/verifyEmail", authController.postVerifyEmail);
app.get("/forgotPassword", authController.getforgotPassword);
app.post("/forgotPassword", authController.postforgotPassword);
app.get("/authCode", authController.getauthCode);
app.post("/authCode", authController.postauthCode);
app.get("/resetPassword", authController.getresetPassword);
app.post("/resetPassword", authController.postresetPassword);
app.get("/home", authController.getHome)

app.listen(3000, function () {
    console.log("Server running at port 3000....");
});

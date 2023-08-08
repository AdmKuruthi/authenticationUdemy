//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


//const md5 = require('md5');
//const security = require('./utilities/security');
const app = express();

require('./models/user');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.use(session({
    secret: process.env.PASS_KEY,
    resave: false,
    saveUninitialized: false
}));
// Needs to be initialized right away
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1/userDB");
const userModel = mongoose.model('user');
passport.use(userModel.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id)
});
passport.deserializeUser((id,done) => {
  userModel.findById(id)
    .then((user) => {
      done(null, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

const routes = require('./utilities/routes');
app.use(routes);


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
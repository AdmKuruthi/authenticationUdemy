//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


const md5 = require('md5');
const security = require('./utilities/security');
const app = express();

require('./models/user');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1/userDB");
const userModel = mongoose.model('user');


app.get('/', (req, res) =>{
    res.render('home');
});

app.route('/login')
    .get((req, res) =>{
        res.render('login', {error: false});
    })
    .post(async (req, res) =>{
        try{
            const email = req.body.username;
            const password = req.body.password;
            
            const result = await userModel.findOne({email : email});
            //if(result != null && result.password === md5(password)){
            if(result != null && await security.compare(password, result.password)){
                res.render('secrets');
            } 
            else{
                res.render('login', {error: true});
            }
        }
        catch(err){
            console.log(err);
            res.send(err);
        }
    });

app.route('/register')
    .get((req, res) =>{
        res.render('register');
        }
    )
    .post(async (req, res) =>{
        try{
            
            const newEmail = req.body.username;
            const newPassword = req.body.password;
            const hash = await security.encrypt(newPassword);
            //const newUser = new userModel({email: newEmail, password: newPassword});
            // await userModel.create({
            //     email: newEmail,
            //     password: md5(newPassword)
            // });

            await userModel.create({
                email: newEmail,
                password: hash
            });

            res.redirect('/');
        }
        catch(err){
            console.log(err);
            res.send(err);
        }
    });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
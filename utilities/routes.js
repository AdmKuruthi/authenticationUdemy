const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const ejs = require("ejs");
const passport = require('passport');
const service = require('./service');



router.get('/', (req, res) =>{
    res.render('home');
});

router.route('/login')
    .get((req, res) =>{
        res.render('login', {error: false});
    })
    .post(passport.authenticate('local',{failureRedirect: '/login', failureFlash: true}),
        (req,res) => {
            res.redirect('/secrets');
        });

router.route('/register')
    .get((req, res) =>{
        res.render('register');
        }
    )
    .post(async (req, res, next) =>{
        try{
            
            const newEmail = req.body.username;
            const newPassword = req.body.password;
            const userRegistered = await service.registerUser(newEmail, newPassword);
            userRegistered === true ? res.redirect('/') : res.send('User was not registered. Check error log');
            //**Older approaches */

            // const newEmail = req.body.username;
            // const newPassword = req.body.password;
            // //const newUser = new userModel({email: newEmail, password: newPassword});
            // // await userModel.create({
            // //     email: newEmail,
            // //     password: md5(newPassword)
            // // });
            
            // const hash = await security.encrypt(newPassword);
            // await userModel.create({
            //     email: newEmail,
            //     password: hash
            // });
            // res.redirect('/');
        }
        catch(err){
            console.log(err);
            res.send(err);
        }
    });

router.route('/submit')
    .get((req,res) => {
        req.isAuthenticated() ? res.render('submit') : res.render('login', {error: true});
    })
    .post(async (req,res) => {
        const newSecret = req.body.secret;
        const secretRegistered = await service.registerSecret(newSecret, req.user._id);
        secretRegistered === true ? res.redirect('/') : res.send('User was not registered. Check error log');
    });
router.route('/secrets')
    .get((req,res) => { // Check if session is alive
        req.isAuthenticated() ? res.render('secrets') : res.render('login', {error: true});
    });

router.route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email']}));

router.route('/auth/google/secrets')
    .get(passport.authenticate('google', {failureRedirect: '/login'}), (req, res) => {
        res.redirect('/secrets');
    });

module.exports = router;
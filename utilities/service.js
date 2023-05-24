const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

require('../models/user');

mongoose.connect("mongodb://127.0.0.1/userDB");
const userModel = mongoose.model('user');

const registerUser = (username, password) => {
    return new Promise((resolve,reject) => {
        userModel.register(
            new userModel({username: username}),
            password,
            (err) => {
                if(err){
                    console.log(err);
                    reject(err);
                    //return next(err);
                }
                else{
                    //Set cookie
                    const authenticate = userModel.authenticate();
                    authenticate(username,password, function(err, result) {
                        if (err) { 
                            console.log(err);
                            //res.send(err);
                            reject(err);
                            //return next(err);
                        }
                        console.log("User registered");
                        resolve(true);
                    });
                }
            
                }
        )
    });
}

module.exports = {registerUser}
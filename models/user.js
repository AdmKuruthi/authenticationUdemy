const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const encrypt = require('mongoose-encryption');
const passport_local_mongoose = require('passport-local-mongoose');
const findOrCreate  = require('mongoose-findorcreate');

const userSchema = mongoose.Schema({
    
    /**
     * No longer required with passport
     */
    // email : {
    //     required: true,
    //     type: String
    // },
    // password: {
    //     required: true,
    //     type: String
    // }


    /**Needed for Google Auth*/
    email: String,
    password: String,
    googleId: String,
    secret: String
});


//userSchema.plugin(encrypt, {secret: process.env.ENC_KEY, encryptedFields:['password']});
userSchema.plugin(passport_local_mongoose);
userSchema.plugin(findOrCreate);
module.exports = mongoose.model('user', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const encrypt = require('mongoose-encryption');
const passport_local_mongoose = require('passport-local-mongoose');

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
});


//userSchema.plugin(encrypt, {secret: process.env.ENC_KEY, encryptedFields:['password']});
userSchema.plugin(passport_local_mongoose);
module.exports = mongoose.model('user', userSchema);
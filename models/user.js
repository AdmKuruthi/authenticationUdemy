const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encrypt = require('mongoose-encryption');

const userSchema = mongoose.Schema({
    email : {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

console.log(process.env.ENC_KEY);

userSchema.plugin(encrypt, {secret: process.env.ENC_KEY, encryptedFields:['password']});

module.exports = mongoose.model('user', userSchema);
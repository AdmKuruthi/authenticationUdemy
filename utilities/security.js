const bcrypt = require('bcrypt');
const saltRounds = 10;


const encrypt = async (password, callback) => { 
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(!err)
                    resolve(hash);
                else{
                    reject(err);
                }
            });
        });
    });
    
}


const compare = async(password, hash) => {
   return new Promise((resolve, reject) =>{ 
        bcrypt.compare(password, hash, (err, result) => {
            resolve(result);
        });
    });
}

module.exports = {encrypt, compare};
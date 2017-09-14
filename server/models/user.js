const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//define model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//encrypt password
userSchema.pre('save', function(next) {
    //get access to user model
    const user = this;

    //generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
        if(err) { return next(err); }

        //encrypt password using salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) { return next(err); }

            //overight the password with encrypted password
            user.password = hash;
            next();
        });
    });
});

//create model class
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

// create a token for user
function tokenForUser(user) {
    const timestamp = new Date().getTime();

    //encode jwt with subject of user, iat of timestamp and config.secret
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    //user has already verified, just give a token here
    res.send({ token: tokenForUser(req.user) });

}

exports.signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(422).send({ error: 'You must provide email and password'});
    }

    //check if user exist
    User.findOne({ email: email }, function(err, existingUser) { //find email then return existingUser variable
        if(err) { return next(err); }

        //if user email exist
        if(existingUser){
            return res.status(422).send({ error: 'Email already exist' });
        }

        //save value on user const
        const user = new User({
            email: email,
            password: password
        });

        //save value on user
        user.save(function(err) {
            if(err) { return next(err); }

            //return user token
            res.json({ token: tokenForUser(user) });
        });
    });
}
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), // extract authorization from header
    secretOrKey: config.secret //decode token using config.secret
};

//create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {

    //see if the userid in the payload exist in our database
    //if exist, call done with user object
    //otherwise, call done without user object
    User.findById(payload.sub, function(err, user) {
        if(err) { return done(err,false); }

        if(user){
            return done(null, user);
        } else{
            return done(null, false);
        }
    });
});

//tell passport to use jwtlogin strategy
passport.use(jwtLogin);
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy (login)
const localOptions = { usernameField: 'email' }; //post data, password is automatic
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    //verify email and password, 
    //call done with user if correct credentials
    //if not call done with false
    User.findOne({ email: email}, function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false); } //wrong email

        //compare password
        user.comparePassword(password, function(err, isMatch) {
            if(err) { return done(err); }
            if(!isMatch) { return done(null, false); } // password not match

            return done(null, user); //password match assign to req.user(signin)
        });
    });

});

// setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'), // extract authorization from header
    secretOrKey: config.secret //decode token using config.secret
};

//create jwt strategy (register)
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
//tell passport to use locallogin strategy
passport.use(localLogin);
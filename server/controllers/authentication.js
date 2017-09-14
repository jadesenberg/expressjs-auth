const User = require('../models/user');

exports.signup = function(req, res, next) {

    const email = req.body.email;
    const password = req.body.password;

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

            //response to request
            res.json({ success: true });
        });
    });
}
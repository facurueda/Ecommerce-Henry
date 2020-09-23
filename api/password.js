const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const {user}  = require('../db.js');
const User = require('./src/models/User.js');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'}, (email,password,done ) => {
            User.findOne({ email: email}) // match user
            .then(user => {
                if(!user){
                    return done(null,false, {message: 'that email is not registered'})
                }
                // match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user)
                    } else {
                        return done(null, false, {message:'Password incorrect '})
                    }

                });
            })
            .catch(err => console.log(err))
        }) 
        
    )

    passport.serializeUser(function(user,done){
        done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            done(err,user);
        });
    });
} 
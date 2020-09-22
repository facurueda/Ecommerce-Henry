const server = require('express').Router();
const Sequelize = require("sequelize");
const {user}  = require('../db.js');
const bcrypt = require('bcrypt'); 


server.post('/register', (req,res) => {
    const {name,email,password,password2} = req.body;
    let errors= [];
    //me aseguro que se llenen los campos del register
    if(!name || !email || !password || !password2) {
        errors.push({ msg :'Please fill in all fields'});
    }
    //checkeo match de contraseña
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
    }
    // chequeo long pasword
    if(password.length < 6) {
        errors.push({msg:'Password should be at last 6 characters'});
    }
    if(errors.length > 0) {  //------>por que envio?
        res.send('Register', {
            errors,
            name,
            email,
            password,
            password2
        })

    } else {
        //validation
        User.findOne({ email: email})
        .then(user => {
            if(user){
            //userexist ---> me fijo si el usuario existe y si no creo uno
            errors.push({ msg : 'Email already exist'});
            res.send('Register', {
                errors,
                name,
                email,
                password                
                });
                } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });

                //Hash Password
                bcrypt.genSalt(10, (err,salt) => 
                bcrypt.hash(newUser.password,salt, (err, hash) => {
                        if(err) throw err;
                        // set password to hash
                        newUser.password = hash; 
                        //save user 
                        newUser.save()
                        .then()
                        .catch(err => console.log(err));
                }))
            }
        });
    }
});


module.exports = server;
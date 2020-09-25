    


const { noExtendLeft } = require("sequelize/types/lib/operators");  // que es esto????


    
    server.post('forgot',(req,res) => {   // creo un token para el usuario olvidadizo
        async.waterfall([
            function(done) {
                crypto.randomBytes(20,function(err,buf){
                    var token = buf.toString('hex');
                    done(err,token)
                })
            },

            function(token,done){
                User.finOne({
                    where : {
                        email : req.body.email
                    }
                }).then((user) => { 
                    if(!user){
                        req.flash('error', 'Not acount with that email adress exists.');
                        return res.redirect('/forgot')
                    } 
                    user.update({
                        ...user,
                        restPasswordToken : token,
                        resetPasswordExpires : Date.now() + 3600000
                    })                   
                })
            
            },

/*                 User.findOne({ email: req.body.email}, function(err,user) {
                    if(!user){
                        req.flash('error','Not acount with that email adress exists.');
                        return res.redirect('/forgot') //opcion de registrarse
                    }                   

                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000; // le doy solo una hora de vida a su token

                    user.save(function(err) {
                        done(err,token,user);
                    });
                });
            },  */

            /// creo el transporte---> me loggeo en el mail
            function (token, user, done){
            const smtpTransport= nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
            user: 'muhammad.okuneva38@ethereal.email',
            pass: '7722sjB3YaG5uyU3WD'
            }
            });
                

                var mailOption = {
                    to: user.email,
                    from: 'Lacoseria',
                    subject : 'Reset Password',
                    text: 'You are reiciving this because you (or someone else) have requested the reset of the password. Please click on the following link, o blabla' +
                   /*  'http://' + req.header.host + '/reset/' + token + '\n\n' +  */
                    'If you didn´t requested this please ignore this email'
                };
                
                smtpTransport.sendMail(mailOption, function(err){
                    console.log('mail send');
                    req.flash('success', 'An e-mail has been send to ' + user.email + 'Whit further instructions');
                    done(err, 'done');
                });
            }
        ], function(err){
            if(err) return next(err);
            res.redirect('/forgot');
        });
    });


    ///// cpnfirm password 
   /*  server.get('/reset:token', (req, res) => {
        user.findOne({
            
                resetPasswordToken : req.params.resetPasswordToken,
                resetPasswordExpires : { $gt: Date.now() }            
        },  function(err,user){
            if(!user) {
                req.flash('error', 'Password reset token is invalid or has expired');
                return res.redirect('/forgot');
            }
            res.send('reset', {token: req.params.token});
        });
    });


    server.post('/reset:token', (req, res) => {
        async.waterfall([
            function(done){
                User.findOne({
                    where:{
                
            }})}
            
        ])
    })
     
 */
        module.export = server;
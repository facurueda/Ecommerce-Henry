const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const {
    User,
} = require('./db');

function initialize(passport, getUserByEmail, getUserById) {
    
  const authenticateUser = async (email, password, done) => {
    
    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    console.log('console 1')
    console.log(user.idUser)
    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log('console 2')
        return done(null, user)
      } else {
        console.log('console 3')
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  const getUserId = async (id) => {
    await User.findOne({
        where: {
            idUser: id
        }
    })
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  
  passport.serializeUser( function(user, done) {
    done(null, user.idUser)
  });

    // (user, done) => done(null, user.idUser))
  
  passport.deserializeUser( function(id, done) {
    /* User.findById(id, function(err, user) {
      done(err, user)
    }) */
    
       done(null, getUserId(id));
  // });
  });
    
    
  //   (id, done) => {
  //     console.log('id', id)
  //   return done(null, getUserId(id))
  // })

//   passport.deserializeUser(function(id,done){
//     return done(null, User.findOne({
//         where: {
//             idUser: id
//         }
//     }))
    // User.findOne(userId,function(err,user){
        // done(err,user);
    // });
// });
// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });
}

module.exports = initialize
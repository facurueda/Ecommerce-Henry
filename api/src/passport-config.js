const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GithubStrategy = require("passport-github").Strategy;

const bcrypt = require('bcrypt');
const {
  User,
  Order,
  Inter_Prod_Order
} = require('./db');

function initialize(passport) {

  const authenticateUser = async (req, email, password, done) => {
    const { idUser } = req.body
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    ///////////////////////////////// In case the user doesnt exist
    if (user == null) {
      return done(null, false, {
        message: 'No user with that email'
      })
    }
    ///////////////////////////////// In case the user exist and test the password
    try {
      if (await bcrypt.compare(password, user.password)) {
        const orderUserLogin = await User.findOne({
          where: {
            email: email
          }
        }).then(user => {
          return Order.findOne({
            where: {
              idUser: user.idUser
            }
          })
        })
        const orderGuest = await Order.findOne({
          where: {
            idUser: idUser
          }
        })
        Order.findOne({
          where: {
            idUser: idUser
          }
        }).then(order => {
          return Inter_Prod_Order.findAll({
            where: {
              idOrder: order.idOrder
            }
          })
        }).then(inters => {
          inters.map(inter => {
            const interQuantity = inter.quantity
            Inter_Prod_Order.findOne({
              where: {
                idProduct: inter.idProduct,
                idOrder: orderUserLogin.idOrder
              }
            }).then(inter => {
              return inter.update({
                ...inter,
                quantity: inter.quantity + interQuantity
              })
            }).catch(() => {
              return Inter_Prod_Order.create({
                idProduct: inter.idProduct,
                price: inter.price,
                quantity: inter.quantity,
                idOrder: orderUserLogin.idOrder
              })
            })
          })
        }).then(() => {
          Order.destroy({
            where: {
              idOrder: orderGuest.idOrder
            }
          })
        }).then(() => {
          return User.destroy({
            where: {
              idUser: idUser
            }
          })
        }).catch()
        return done(null, user)
      } else {
        return done(null, false, {
          message: 'Password incorrect'
        })
      }
    } catch (e) {
      return done(e)
    }
  }

  // Google Strategy

  const authenticateUserGoogle = async (accessToken, refreshToken, profile, done) => {
    const hashedPassword = await bcrypt.hash('passwordGoogleAccount', 10)
    User.findOne({
      where: {
        email: profile.emails[0].value
      }
    }).then(user => {
      if (!user) {
        User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: hashedPassword,
          level: 'user',
          img: profile.photos[0].value
        }).then(user => {
          console.log(user)
          Order.create({
            idUser: user.idUser,
            status: 'CREADA'
          }).then(order => {
            console.log(order)
            User.findOne({
              where: {
                idUser: order.idUser
              }
            }).then(user => {
              return done(null, user)
            })
          })
        })
      } else {

        User.findOne({
          where: {
            email: profile.emails[0].value
          }
        }).then(user => {
          return done(null, user)
        })
      }
    })
  }

  passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
    authenticateUserGoogle
  ));

  const authenticateUserGitHub = async (accessToken, refreshToken, profile, done) => {
    console.log('github', profile)
    const hashedPassword = await bcrypt.hash('passwordGitHubAccount', 10)
    User.findOne({
      where: {
        email: profile._json.email
      }
    }).then(user => {
      if (!user) {
        profile._json.email ? (
          User.create({
            name: profile._json.name,
            email: profile._json.email,
            password: hashedPassword,
            level: 'user',
            img:  profile._json.avatar_url
          })
        ) : (
          User.create({
            name: profile._json.name,
            email: 'Vincule_su_email_en_GitHub@laCoseria.com',
            password: hashedPassword,
            level: 'user',
            img:  profile._json.avatar_url
          })
        )
        .then(user => {
          console.log(user)
          Order.create({
            idUser: user.idUser,
            status: 'CREADA'
          }).then(order => {
            console.log(order)
            User.findOne({
              where: {
                idUser: order.idUser
              }
            }).then(user => {
              return done(null, user)
            })
          })
        })
      } else {
        User.findOne({
          where: {
            email: profile._json.email
          }
        }).then(user => {
          return done(null, user)
        })
      }
    })
  }

  passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
    authenticateUserGitHub
  ));




  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, authenticateUser))

  passport.serializeUser(function (user, done) {
    done(null, user.idUser);
  });

  passport.deserializeUser(function (id, done) {
    console.log('deserializing user:')
    User.findOne({
      where: {
        idUser: id
      }
    }).then(user => {
      done(null, user);
    }).catch(done)
  });
}

module.exports = initialize
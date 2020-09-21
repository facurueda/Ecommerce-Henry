const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const {
  User,
  Order,
  Inter_Prod_Order
} = require('./db');

function initialize(passport) {

  // Tengo GUEST {
  //    idUser: 123
  //    email: aasldjaslk@gmail.com
  // }
  // ME llega un usuario login {
  //    email: facu@gmail.com,
  //    password: 1234 
  // }

  const authenticateUser = async (req, email, password, done) => {

    const {
      idUser
    } = req.body

    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if (user == null) {
      return done(null, false, {
        message: 'No user with that email'
      })
    }
    console.log('console 1')
    console.log(user.idUser)


    try {
      if (await bcrypt.compare(password, user.password)) {

        Order.findOne({
          where: {
            idUser: idUser,
          },
        }).then(order => {
          return Inter_Prod_Order.findAll({
            where: {
              idOrder: order.idOrder
            }
          })
        }).then(inters => {
          return User.findOne({
            where: {
              email: email
            }
          }).then(user => {
            return Order.findOne({
              where: {
                idUser: user.idUser
              }
            })
          }).then(order => {
            inters.map(inter => {
              return Inter_Prod_Order.create({
                ...inter,
                idOrder: order.idOrder
              })
            })
            return order
          }).then(order => {
            Inter_Prod_Order.destroy({
              where: {
                idOrder: order.idOrder
              }
            })
          })
        }).then(() => {
          Order.destroy({
            where: {
              idUser: idUser
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

  const getUserId = async (id) => {
    await User.findOne({
      where: {
        idUser: id
      }
    })
  }

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, authenticateUser))

  passport.serializeUser(function (user, done) {
    done(null, user.idUser)
  });

  passport.deserializeUser(function (id, done) {
    done(null, getUserId(id));
  });

}

module.exports = initialize
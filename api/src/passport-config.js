const LocalStrategy = require('passport-local').Strategy
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

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, authenticateUser))

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
}

module.exports = initialize
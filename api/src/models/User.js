const crypto = require('crypto');

function createSalt() {
  return crypto.randomBytes(20).toString('hex');
}

const User = (sequelize, S) => {
  const U = sequelize.define('users', {
    id: {
      type: S.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: S.STRING,
      validate: {
        isEmail: true,
      },
      primaryKey: true,
    },
    passwordsalt: {
      type: S.STRING,
    },
    state: {
      type: S.ENUM,
      values: ['pending', 'active', 'disabled'],
      defaultValue: 'pending',
      field: 'enum_state',
    },
    accessLevel: {
      type: S.INTEGER,
      defaultValue: 0,
    },
    activatedAt: {
      type: S.DATE,
    },
    password: {
      type: S.STRING,
      validate: { len: [4, 40] },
      set(plainPassword) {
        if (typeof plainPassword !== 'string' || plainPassword.length < 4) {
          return this.setDataValue('password', plainPassword);
        }
        this.token = null;
        this.setDataValue('passwordsalt', createSalt());
        this.setDataValue('state', 'active');
        return this.setDataValue('password', this.encryptPassword(plainPassword));
      },
    },
    token: {
      type: S.STRING,
      defaultValue: createSalt(),
    },
    tokenCreatedAt: {
      type: S.DATE,
    },
  });

  U.prototype.encryptPassword = function encryptPassword(plain) {
    return crypto.createHmac('sha1', this.passwordsalt).update(plain).digest('hex');
  };
  U.prototype.isTokenOutdated = function isTokenOutdated() {
    const currentDate = new Date();
    const tokenAge = (currentDate - this.tokenCreatedAt) / 1000;
    return tokenAge > 604800; // one week
  };
  U.prototype.createToken = function createToken() {
    if (!this.token || this.isTokenOutdated()) {
      this.token = createSalt();
      return this.save();
    }
    return this.token;
  };

  U.prototype.activate = function activate(password, token) {
    if (this.token !== token || !password || !token) return Promise.reject(new Error('invalid Token.'));
    this.password = password;
    return this.save();
  };

  U.authenticate = function authenticate(email, password) {
    return new Promise((resolve) => {
      if (!password) return resolve(false);
      return U.findOne({
        where: {
          email,
        },
      }).then((foundUser) => {
        if (!foundUser) return resolve(false);
        if (foundUser.state !== 'active') return resolve(false);
        if (foundUser.password === foundUser.encryptPassword(password)) {
          return resolve(foundUser);
        }
        return resolve(false);
      });
    });
  };

  U.activateUser = function activateUser(email, token, password, name, lastname) {
    return this.findOne({ where: { email } })
      .then((found) => {
        if (!found) throw new Error('User Not Found');
        return found;
      })
      .then((foundUser) => foundUser.activate(password, token));
  };
  U.forgotPassword = function forgotPassword(email) {
    return U.findOne({
      where: {
        email,
      },
    }).then((foundUser) => {
      if (foundUser) {
        return foundUser.update({ token: createSalt() });
      }
      throw new Error('No user found');
    });
  };
  U.changePassword = function changePassword(email, oldPassword, newPassoword) {
    return new Promise((resolve, reject) => {
      if (!oldPassword || !newPassoword || !email) {
        reject(new Error({
          code: 400,
          message: 'Password and/or mail can not be empty.',
        }));
      }
      return U.findOne({
        where: {
          email,
        },
      }).then((foundUser) => {
        if (!foundUser) return resolve(false);
        if (foundUser.state !== 'active') return resolve(false);
        if (foundUser.password === foundUser.encryptPassword(oldPassword)) {
          foundUser.password = newPassoword;
          foundUser.token = null;
          return resolve(foundUser.save());
        }
        return reject(new Error({
          code: 400,
          message: 'Password and/or email are incorrect.',
        }));
      });
    });
  };
  return U;
};

module.exports = User;

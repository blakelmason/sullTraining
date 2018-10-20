const db = require('../models');
const helpers = require('./helpers');
const bcrypt = require('bcrypt');

const validate = helpers.validate;

module.exports = {
  login: {
    validate(data) {
      data.email = validate.email(data.email);
      data.password = validate.password(data.password);
      data.valid = validate.checkForNull(data);
      return data;
    },

    getUser(data) {
      return new Promise((resolve, reject) => {
        db.User.findOne({ where: { email: data.email } })
          .then(user => resolve(user))
          .catch(err => reject(err));
      })
    },

    checkPassword(clientPassword, user, res) {
      bcrypt.compare(clientPassword, user.password)
        .then(passwordMatch => {
          if (passwordMatch) {
            delete user.password;
            res.json(user);
          } else res.status(401).json({ error: 'Wrong password.' })
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Password check error.' })
        });
    }
  },

  register: {
    validate(data) {
      data.email = validate.email(data.email);
      data.password = validate.password(data.password);
      data.firstName = validate.firstName(data.firstName);
      data.lastName = validate.lastName(data.lastName);
      data.valid = validate.checkForNull(data);
      if (data.valid) return data;
      else throw error(500, 'Validation error.');
    },

    hashPassword(password) {
      return new Promise((resolve, reject) => {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds)
          .then(hash => resolve(hash))
          .catch(err => reject(err));
      })
    },

    findOrCreateUser(data) {
      return new Promise((resolve, reject) => {
        db.User.findOrCreate({
          where: {
            email: data.email
          },
          defaults: {
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
          }
        })
          .spread((user, created) => resolve(created))
          .catch(err => reject(err));
      })
    }
  }
}



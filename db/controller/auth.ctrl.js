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

    getUser(data, res) {
      db.User.findOne({
        where: { email: data.email }
      })
        .then(user => {
          if (user) {
            this.checkPassword(data.password, user.dataValues, res);
          }
          else res.status(404).json({ error: 'User does not exist.' })
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Database read.' });
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
          res.status(500).json({ error: 'Password handling.' })
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
      return data;
    },

    postUser(data, res) {
      const saltRounds = 10;
      bcrypt.hash(data.password, saltRounds)
        .then(function (hash) {
          data.password = hash;
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
            .spread((user, created) => {
              res.json({ created: created })
            })
            .catch(err => {
              console.error(err);
              res.status(500);
            })
        });
    }
  }
}


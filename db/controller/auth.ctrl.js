const db = require('../models');
const helpers = require('./helpers');

const password = helpers.password;
const validate = helpers.validate;

module.exports = {

  login: {
    validateLogin(data) {
      data.email = validate.email(data.email);
      data.password = validate.password(data.password);
      data.valid = validate.checkForNull(data);
    }
  },

  register: {
    validateRegistration(data) {
      data.email = validate.email(data.email);
      data.password = validate.password(data.password);
      data.firstName = validate.firstName(data.firstName);
      data.lastName = validate.lastName(data.lastName);
      data.valid = validate.checkForNull(data);
      return data;
    },

    addUserToDb(data, res) {
      password.hash(data.password)
        .then(hash => {
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
        })
        .catch(err => console.error(err));
    }
  }
}


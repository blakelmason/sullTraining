const bcrypt = require('bcrypt');

const validate = require('./validate');

module.exports = {
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
}
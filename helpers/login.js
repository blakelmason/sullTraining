const validate = require('./validate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  validate(data) {
    data.email = validate.email(data.email);
    data.password = validate.password(data.password);
    data.valid = validate.checkForNull(data);
    return data;
  },

  checkPassword(clientPassword, userPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(clientPassword, userPassword)
        .then(authenticated => resolve(authenticated))
        .catch(err => reject(err));
    })
  }
}
const validator = require('validator');
const bcrypt = require('bcryptjs');
const db = require('../db/models');

module.exports = {
  validateRegistration(data) {
    const validationResults = {};
    // validate email
    if (data.email) {
      let email = validator.trim(data.email);
      email = validator.normalizeEmail(email);
      if (validator.isEmail(email)) {
        validationResults.email = email;
      } else {
        validationResults.email = null;
      }
    } else {
      validationResults.email = null;
    }
    //validate firstName
    if (data.firstName) {
      const firstName = validator.trim(data.firstName);
      validationResults.firstName = firstName;
    } else {
      validationResults.firstName = null;
    }
    //validate lastName 
    if (data.lastName) {
      const lastName = validator.trim(data.lastName);
      validationResults.lastName = lastName;
    } else {
      validationResults.lastName = null;
    }
    //validate password
    if (data.password) validationResults.password = data.password;
    else validationResults.password = null;

    return validationResults;
  },

  hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      })
    })
  },

  registerUser(data, res) {
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
  }
}
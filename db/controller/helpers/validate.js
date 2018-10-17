const validator = require('validator');

module.exports = {
  email(email) {
    if (email) {
      email = validator.trim(email);
      email = validator.normalizeEmail(email);
    }
    if (validator.isEmail(email)) return email;
    return null;
  },

  password(password) {
    if (password) return password;
    return null;
  },

  firstName(firstName) {
    if (firstName) {
      firstName = validator.trim(firstName);
      return firstName;
    }
    return null;
  },

  lastName(lastName) {
    if (lastName) {
      lastName = validator.trim(lastName);
      return lastName;
    }
    return null;
  },


  checkForNull(data) {
    const values = Object.values(data);
    values.forEach(value => {
      if (value === null) return false;
    });
    return true;
  }
}
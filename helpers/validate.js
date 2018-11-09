const validator = require('validator');

module.exports = {
  email(email) {
    if (email) {
      if (email.length <= 128) {
        email = validator.trim(email);
        email = validator.normalizeEmail(email);
        if (validator.isEmail(email)) return email;
      }
    }
    return null;
  },

  password(password) {
    if (password) {
      if (password.length >= 8 && password.length <= 128) return password;
    }
    return null;
  },

  firstName(firstName) {
    if (firstName) {
      if (firstName.length <= 128) {
        firstName = validator.trim(firstName);
        return firstName;
      }
    }
    return null;
  },

  lastName(lastName) {
    if (lastName) {
      if (lastName.length <= 128) {
        lastName = validator.trim(lastName);
        return lastName;
      }
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
const login = require('./login');
const register = require('./register');
const validate = require('./validate');
const jwt = require('./jwt');

module.exports = {
  login: login,
  register: register,
  validate: validate,
  jwt: jwt,

  error(code, message) {
    const error = {
      code: code,
      message: message,
    }
    return error;
  }
}
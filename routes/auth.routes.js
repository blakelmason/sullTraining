const express = require('express');
const helpers = require('../helpers');
const ctrl = require('../controller').auth;

const router = express.Router();
const error = helpers.error;
const register = helpers.register;
const login = helpers.login;
const jwt = helpers.jwt;

router.post('/register', (req, res) => {
  registerUser(req.body);
  async function registerUser(data) {
    try {
      data = register.validate(data);
      if (!data.valid) throw error(500, 'Registration validation error.');
      data.password = await register.hashPassword(data.password)
        .catch(err => {
          console.error(err);
          throw error(500, 'Password hash error.');
        });
      const created = await ctrl.findOrCreateUser(data)
        .catch(err => {
          console.error(err);
          throw error(500, 'Database registration finOrCreateUser error.')
        });
      res.json({ created: created });
    }
    catch (err) {
      console.error(err);
      res.status(err.code).json({ error: err.message });
    }
  }
});

router.get('/login', (req, res) => {
  loginUser(req.query);
  async function loginUser(data) {
    try {
      data = login.validate(req.query);
      if (!data.valid) throw error(500, 'Login validation error.');
      const dbResponse = await ctrl.findOneUser({ email: data.email })
        .catch(err => {
          console.error(err);
          throw error(500, 'Database login findOne error.');
        })
      if (!dbResponse) throw error(500, 'User does not exist.');
      const user = dbResponse.dataValues;
      const authenticated = await login.checkPassword(data.password, user.password)
        .catch(err => {
          console.error(err);
          throw error(500, 'Password check error.')
        });
      if (!authenticated) throw error(401, 'Wrong password.');
      delete user.password;
      const token = await jwt.create(user)
        .catch(err => {
          console.error(err);
          throw error(500, 'Token creation error.');
        })
      res.json({ token: token });
    }
    catch (err) {
      console.error(err);
      res.status(err.code).json({ error: err.message });
    }
  }
});

module.exports = router;
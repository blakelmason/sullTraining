const express = require('express');
const auth = require('../db/controller/auth.ctrl');
const helper = require('./helpers/error');

const router = express.Router();
const register = auth.register;
const login = auth.login;
const validationError = 'Failed validation.';

router.post('/register', (req, res) => {
  const data = req.body;
  registerUser(data);
  async function registerUser(data) {
    try {
      data = register.validate(data);
      if (!data.valid) throw helper.error(500, 'Validation error.');
      data.password = await register.hashPassword(data.password)
        .catch(err => {
          console.error(err);
          throw helper.error(500, 'Password error.');
        });
      const created = await register.findOrCreateUser(data)
        .catch(err => {
          console.error(err);
          throw helper.error(500, 'Database error.')
        });
      res.json({ created: created });
    } catch (err) {
      console.error(err);
      res.status(err.code).json({ error: err.message });
    }
  }
});

router.get('/login', (req, res) => {
  const data = login.validate(req.query);
  if (data.valid) login.getUser(data, res);
  else res.status(500).json({ error: validationError });
});

module.exports = router;
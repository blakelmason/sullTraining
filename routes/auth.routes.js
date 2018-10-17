const express = require('express');
const auth = require('../db/controller/auth.ctrl');

const router = express.Router();

const register = auth.register;
const login = auth.login;
const message = 'Failed validation.';

router.post('/register', (req, res) => {
  const data = register.validate(req.body);
  if (data.valid) register.postUser(data, res);
  else res.status(500).json({ error: message });
})

router.get('/login', (req, res) => {
  const data = login.validate(req.query);
  if (data.valid) login.getUser(data, res);
  else res.status(500).json({ error: message });
})

module.exports = router;
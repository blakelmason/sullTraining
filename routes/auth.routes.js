const express = require('express');
const auth = require('../db/controller/auth.ctrl');

const router = express.Router();

const register = auth.register;
const login = auth.login;

router.post('/register', (req, res) => {
  const data = register.validateRegistration(req.body);
  if (data.valid) {
    register.addUserToDb(data, res);
  } else {
    const message = 'Failed validation.';
    console.error(message);
    res.status(500).json({ error: message })
  }
})

router.get('/login', (req, res) => {
  const data = req.query;

  res.send('yay');
})

module.exports = router;
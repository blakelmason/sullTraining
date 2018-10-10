const express = require('express');
const auth = require('../controller/auth.ctrl');

const router = express.Router();

router.post('/register', (req, res) => {
  const data = auth.validateRegistration(req.body);
  const validData = true;
  const values = Object.values(data);
  values.forEach(value => {
    if (value === null) validData = false;
  })
  if (validData) {
    auth.hashPassword(data.password)
      .then(hash => {
        data.password = hash;
        auth.registerUser(data, res);
      })
      .catch(err => console.error(err));
  } else {
    const message = 'Failed validation.';
    console.error(message);
    res.status(500).json({ error: message })
  }
})

module.exports = router;
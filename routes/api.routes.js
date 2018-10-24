const express = require('express');
const helpers = require('../helpers');
const ctrl = require('../controller');

const router = express.Router();
const error = helpers.error;
const api = ctrl.api;

router.get('/user', (req, res) => {
  const data = req.locals;
  getUser(data);
  async function getUser(data) {
    try {
      const dbResponse = await ctrl.auth.findOneUser({ id: data.id })
        .catch(err => {
          console.error(err);
          throw error(500, 'API /user findOneUser error.');
        })
      const user = dbResponse.dataValues;
      delete user.password;
      res.json(user);
    }
    catch (err) {
      console.error(err);
      res.status(err.code).json({ error: err.message });
    }
  }
});

module.exports = router;
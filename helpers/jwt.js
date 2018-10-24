const jwt = require('jsonwebtoken');

module.exports = {
  create(user) {
    return new Promise((resolve, reject) => {
      jwt.sign({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        id: user.id,
      }, process.env.SECRET, { expiresIn: '14d' }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    })
  },

  verify(req, res, next) {
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'JWT verification error' });
      } else {
        req.locals = data;
        return next();
      }
    });
  }
}
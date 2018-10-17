const bcrypt = require('bcrypt');

module.exports = {
  hash(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      })
    })
  }
}
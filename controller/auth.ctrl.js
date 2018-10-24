const db = require('../db/models');

module.exports = {
  findOneUser(param) {
    return new Promise((resolve, reject) => {
      db.User.findOne({ where: param })
        .then(user => resolve(user))
        .catch(err => reject(err));
    })
  },

  findOrCreateUser(data) {
    return new Promise((resolve, reject) => {
      db.User.findOrCreate({
        where: {
          email: data.email
        },
        defaults: {
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
        }
      })
        .spread((user, created) => resolve(created))
        .catch(err => reject(err));
    })
  }
}



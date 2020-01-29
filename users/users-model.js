const db = require("../data/db-config");

function find() {
  return db("users");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
function findBy(username) {
  return db("users")
    .where(username)
    .first();
}

function insert(user) {
  return db("users")
    .insert(user)
    .then(userId => {
      const [id] = userId;
      return findById(id);
    });
}

module.exports = {
  find,
  findById,
  findBy,
  insert
};

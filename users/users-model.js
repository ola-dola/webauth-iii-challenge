const db = require("../data/db-config");

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users")
    .where({ filter })
    .first();
}

function insert(user) {
  return db("users").insert(user);
}

module.exports = {
  find,
  findBy,
  insert
};

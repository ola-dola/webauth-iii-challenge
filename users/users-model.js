const db = require("../data/db-config");

function findByDepartment(userDepartment) {
  return db("users").where({ department: userDepartment})
  
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
  findByDepartment,
  findById,
  findBy,
  insert
};

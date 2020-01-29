const express = require("express");

const restricted = require('../auth/restricted-middleware');

const Users = require("./users-model");

const router = express.Router();

router.get("/users", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Unexpected server error" });
    });
});

module.exports = router;

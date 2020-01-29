const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../users/users-model");

const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password, department } = req.body;

  const hashPass = bcrypt.hashSync(password, 10);

  const userSecured = {
    username,
    password: hashPass,
    department
  };

  if (username && password && department) {
    User.insert(userSecured)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Unexpected server error" });
      });
  } else {
    res
      .status(400)
      .json({
        message:
          "Thou shall not pass, unless you provide all required credentials"
      });
  }
});

module.exports = router;

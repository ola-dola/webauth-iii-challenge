const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../users/users-model");

const router = express.Router();

function makeToken(user) {
  const payload = {
    sub: user.id,
    username: user.username,
    department: user.department
  };
  const options = {
    expiresIn: "1d"
  };
  const token = jwt.sign(payload, process.env.JWTSECRET || "koala", options);

  return token;
}

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
        user.password = undefined; //crude removal of password from return obj. (o__0)
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Unexpected server error" });
      });
  } else {
    res.status(400).json({
      message:
        "Thou shall not pass, unless you provide all required credentials"
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);

  User.findBy({ username })

    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Unexpected server error" });
    });
});

module.exports = router;

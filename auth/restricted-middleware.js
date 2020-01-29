const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || "koala", (err, decoded) => {
      if (err) {
        res.status(401).json({ message: "Provide valid credentials" });
      } else {
        req.decodedToken = decoded;         //why?
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};

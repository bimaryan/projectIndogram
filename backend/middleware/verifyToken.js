const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const tokenVerify = async (req, res, next) => {
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (token == null) res.sendStatus(401);
  try {
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    // console.log(decoded);
    req.body.username = decoded.username;
  } catch (err) {
    // err
    res.sendStatus(403);
  }

  next();
};

module.exports = tokenVerify;

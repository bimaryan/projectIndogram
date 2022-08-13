const bcrypt = require("bcrypt");
const User = require("../config/model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const register = async (req, res) => {
  //   const { username, pass, confPass } = req.body;
  if (req.body.password !== req.body.confPass) {
    res.status(400).json({ msg: "Password not same" });
  }
  console.log(req.body.password !== req.body.confPass);
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPass;
    await User.create(req.body);
  } catch (error) {}

  res.status(201).json({ msg: "Succesfull created!" });
};

const login = async (req, res) => {
  const username = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  const match = await bcrypt.compare(req.body.password, username.get("password"));
  if (!match) res.status(400).json({ msg: "Wrong password!" });

  let access_token = jwt.sign({ id: username.get("id"), username: username.get("username"), password: username.get("password") }, process.env.ACCESS_TOKEN, {
    expiresIn: "15s",
  });

  let refresh_token = jwt.sign({ id: username.get("id"), username: username.get("username"), password: username.get("password") }, process.env.REFRESH_TOKEN, {
    expiresIn: "1d",
  });

  await User.update({ refresh_token: refresh_token }, { where: { id: username.get("id") } });
  res.cookie("refreshToken", refresh_token, {
    maxAge: 86400000,
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({ accessToken: access_token });
};

module.exports = { register, login };

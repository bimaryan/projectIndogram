const bcrypt = require("bcrypt");
const User = require("../config/model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const register = async (req, res) => {
  //   const { username, pass, confPass } = req.body;
  if (req.body.password !== req.body.confPass) {
    res.status(400).json({ msg: "Password not same" });
  }
  //   console.log(req.body.password !== req.body.confPass);
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPass;
    await User.create(req.body);
  } catch (error) {}

  res.status(201).json({ msg: "Succesfull created!" });
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    res.status(200).json({ msg: user });
  } catch (err) {
    res.status(400).json({ msg: "Unknown error" });
  }
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

const refreshToken = async (req, res) => {
  const refresh_token = req.cookies.refreshToken;
  const user = await User.findAll({
    where: {
      refresh_token,
    },
  });
  if (!user[0]) res.status(400).json({ msg: "Unknwon user" });

  let accessToken = jwt.sign({ id: user[0].id, username: user[0].username, password: user[0].password }, process.env.ACCESS_TOKEN, {
    expiresIn: "15s",
  });

  res.status(200).json({ accessToken });
};

const logout = async (req, res) => {
  const refresh_token = req.cookies.refreshToken;
  if (!refresh_token) res.sendStatus(204);
  const user = await User.findAll({
    where: {
      refresh_token,
    },
  });
  if (!user[0]) res.status(400).json({ msg: "Logout failed" });

  await User.update(
    { refresh_token: null },
    {
      where: {
        id: user[0].id,
      },
    }
  );

  res.status(200).json({ msg: "Succesfull logout!" });
};

module.exports = { register, login, getUser, refreshToken, logout };

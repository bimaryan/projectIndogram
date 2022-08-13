const route = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const { login, register, getUser, refreshToken, logout, getAllUsers } = require("../controller/controller");

route.get("/getUser", verifyToken, getUser);
route.get("/getAllUser", verifyToken, getAllUsers);
route.get("/token", refreshToken);
route.post("/register", register);
route.post("/login", login);
route.delete("/logout", logout);

module.exports = route;

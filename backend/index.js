const express = require("express");
const app = express();
const sequelize = require("./config/Database");
const cors = require("cors");
const route = require("./routes/routes");
const jwt = require("jsonwebtoken");
const User = require("./config/model/User");
const dotenv = require("dotenv").config();
const verifyToken = require("./middleware/verifyToken");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(cookieParser());
app.use(express.json({ type: "application/json" }));
app.use(route);

// Check if database connected
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.listen(5050, () => console.log("server listened..."));

const express = require("express");
const app = express();
const sequelize = require("./config/Database");
const cors = require("cors");
const route = require("./routes/routes");
const jwt = require("jsonwebtoken");
const User = require("./config/model/User");
const dotenv = require("dotenv").config();
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

app.delete("/logout", async (req, res) => {
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
});

app.listen(5050, () => console.log("server listened..."));

const express = require("express");
const app = express();
const sequelize = require("./config/Database");
const cors = require("cors");
const route = require("./routes/routes");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/verifyToken");
const User = require("./config/model/User");

app.use(cors());
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

app.get("/getUser", verifyToken, async (req, res) => {
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
});

app.listen(5050, () => console.log("server listened..."));

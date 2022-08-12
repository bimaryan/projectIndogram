const express = require("express");
const app = express();
const sequelize = require("./config/Database");
const cors = require("cors");
const User = require("./config/model/User.js");

app.use(cors());
app.use(express.json({ type: "application/json" }));

// Check if database connected
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.post("/register", async (req, res) => {
  //   const { username, pass, confPass } = req.body;
  await User.create(req.body);
  console.log(User);
});

app.get("/getUser", (req, res) => {});

app.listen(5050, () => console.log("dffd listened..."));

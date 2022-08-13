const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.TEXT,
  },
});

module.exports = User;

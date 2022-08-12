const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();

// db config
const { DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_TYPE } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_TYPE,
});

module.exports = sequelize;

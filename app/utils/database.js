const path = require("path");
const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("sqlite::memory");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.resolve("./storage/app/database.sqlite"),
});

module.exports = sequelize;

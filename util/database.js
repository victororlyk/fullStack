const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-shop", "root", "lightandstrong12", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;

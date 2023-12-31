const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DATABASE_DIALECT,
  port: process.env.DB_PORT,
});
module.exports = sequelize;
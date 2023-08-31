const dbConnection = require('../config/dbConnection');
const db = {};

db.sequelize = dbConnection;

db.User = require('./userModel');
db.UserToken = require('./userTokenModel');
db.Category = require('./categoryModel')
db.Product = require('./productModel')
db.OrderedProduct = require('./orderedProductModel')
db.Address = require('./addressModel')
db.Order = require('./orderModel')
db.Payment = require('./paymentModel')

module.exports = db;
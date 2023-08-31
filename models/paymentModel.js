const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const dayjs = require('dayjs');

const Payment = sequelize.define('payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  paymentType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdBy: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedBy: {
    type: DataTypes.INTEGER
  },
  updatedAt: {
    type: DataTypes.DATE
  },
},
);

Payment.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  values.createdAt = dayjs(values.createdAt).format('dd, MM, YYYY h:mm A');
  values.updatedAt = dayjs(values.updatedAt).format('dd, MM, YYYY h:mm A');
  return values;
};

module.exports = Payment;
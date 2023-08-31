const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const dayjs = require('dayjs');

const Address = sequelize.define('address', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  line1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  line2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zip: {
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

Address.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  values.createdAt = dayjs(values.createdAt).format('dd, MM, YYYY h:mm A');
  values.updatedAt = dayjs(values.updatedAt).format('dd, MM, YYYY h:mm A');
  return values;
};

module.exports = Address;
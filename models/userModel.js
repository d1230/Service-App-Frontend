const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/dbConnection');
const dayjs = require('dayjs');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fname: {
    type: DataTypes.STRING
  },
  lname: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
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
  {
    hooks: {
      beforeCreate: [
        async function (user, options) {
          if (user.password) {
            user.password =
            await bcrypt.hash(user.password, 8);
          }
          user.isDeleted = false;
        },
      ],
    }
  }
);

User.prototype.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  values.createdAt = dayjs(values.createdAt).format('dd, MM, YYYY h:mm A');
  values.updatedAt = dayjs(values.updatedAt).format('dd, MM, YYYY h:mm A');
  delete values.password;
  return values;
};

module.exports = User;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const dayjs = require('dayjs');
const { Category } = require('.');
const dbService = require('../utils/data-service')

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT
  },
  images: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
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
},{
  hooks: {
    afterFind: [
      async function (product, options) {
        if (product) {
          for (let i = 0; i < product.length; i++) {
            const element = product[i];
            const categoryDetails = await dbService.findByPk(Category, element.category);
            element.dataValues.category = categoryDetails;
          }
        }
      },
    ],
  }
}
);

Product.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  values.createdAt = dayjs(values.createdAt).format('dd, MM, YYYY h:mm A');
  values.updatedAt = dayjs(values.updatedAt).format('dd, MM, YYYY h:mm A');
  return values;
};

module.exports = Product;
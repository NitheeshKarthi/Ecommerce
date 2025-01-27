const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  oldPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  deliveryAmount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  deliveryFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  vendorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  url: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true,
});

module.exports = Product;

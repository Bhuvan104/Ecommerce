'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Product, { foreignKey: 'productId' });
      Order.belongsTo(models.User, { foreignKey: 'customerId' });
    }
  }
  Order.init({
    productId: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    placedAt: DataTypes.DATE,
    offerAtOrder: DataTypes.FLOAT,
    datePurchased: DataTypes.DATE,
    deliveryAddressId: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    deliveryStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
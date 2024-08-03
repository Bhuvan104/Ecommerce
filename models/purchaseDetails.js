'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PurchaseDetails extends Model {
    static associate(models) {
      // Define associations here
      PurchaseDetails.belongsTo(models.M_Material, { foreignKey: 'material_id' });
      PurchaseDetails.belongsTo(models.Client, { foreignKey: 'client_id' });
    }
  }

  PurchaseDetails.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    material_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'M_Materials',
        key: 'id'
      }
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Clients',
        key: 'id'
      }
    },
    qty: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    used: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    received_date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'PurchaseDetails',
    tableName: 'purchase_details',
    timestamps: false // Adjust if needed
  });

  return PurchaseDetails;
};

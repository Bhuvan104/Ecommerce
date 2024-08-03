// models/inventoryDetails.js
'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class InventoryDetails extends Model {
    static associate(models) {
      // Define associations here
      InventoryDetails.belongsTo(models.M_Material, { foreignKey: 'material_id' });
    }
  }

  InventoryDetails.init({
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
    qty: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    used: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'InventoryDetails',
    tableName: 'inventory_details',
    timestamps: false // Adjust if needed
  });

  return InventoryDetails;
};

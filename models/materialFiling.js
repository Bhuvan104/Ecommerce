'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MaterialFiling extends Model {
    static associate(models) {
      MaterialFiling.belongsTo(models.MaterialInward, { foreignKey: 'material_inward_id' });
    }
  }

  MaterialFiling.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    material_inward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MaterialInwards',
        key: 'id'
      }
    },
    received_qty: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    assigned_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    balance_qty: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    completed_qty: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    assigned_floor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    assigned_shift: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    manager: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MaterialFiling',
    tableName: 'material_filings',
    timestamps: false // Adjust if needed
  });

  return MaterialFiling;
};

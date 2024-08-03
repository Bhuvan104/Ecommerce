'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MaterialProcess extends Model {
    static associate(models) {
      // Define associations here if necessary
      MaterialProcess.belongsTo(models.MaterialInward, { foreignKey: 'material_inward_id' });
    }
  }

  MaterialProcess.init({
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
    modelName: 'MaterialProcess',
    tableName: 'MaterialProcesses',
    timestamps: false // or true, depending on your needs
  });

  return MaterialProcess;
};

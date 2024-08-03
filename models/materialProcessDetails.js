'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MaterialProcessDetails extends Model {
    static associate(models) {
      // Define associations here
      MaterialProcessDetails.belongsTo(models.MaterialProcess, { foreignKey: 'material_process_id' });
      MaterialProcessDetails.belongsTo(models.M_Material, { foreignKey: 'material_id' });
    }
  }

  MaterialProcessDetails.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    material_process_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MaterialProcesses',
        key: 'id'
      }
    },
    material_id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'M_Materials',
        key: 'id'
      }
    },
    used: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MaterialProcessDetails',
    tableName: 'material_process_details',
    timestamps: false // Adjust if needed
  });

  return MaterialProcessDetails;
};

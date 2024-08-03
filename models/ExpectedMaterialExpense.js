'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ExpectedMaterialExpense extends Model {
    static associate(models) {
      // Define association with MaterialInward
      ExpectedMaterialExpense.belongsTo(models.MaterialInward, {
        foreignKey: 'material_inward_id',
      });

      // Define association with M_Material
      ExpectedMaterialExpense.belongsTo(models.M_Material, {
        foreignKey: 'material',
      });
    }
  }

  ExpectedMaterialExpense.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      material_inward_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      material: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ExpectedMaterialExpense',
      tableName: 'ExpectedMaterialExpenses',
      timestamps: false,
    }
  );

  return ExpectedMaterialExpense;
};

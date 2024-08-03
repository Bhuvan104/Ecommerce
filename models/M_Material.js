'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class M_Material extends Model {
    static associate(models) {
      // Define association with MaterialUnit
      M_Material.belongsTo(models.MaterialUnit, {
        foreignKey: 'unit_id',
      });

      // Add other associations if necessary
    }
  }

  M_Material.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      unit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'M_Material',
      tableName: 'M_Materials',
      timestamps: false,
    }
  );

  return M_Material;
};

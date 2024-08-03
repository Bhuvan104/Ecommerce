// models/materialUnit.js

'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MaterialUnit extends Model {
    static associate(models) {
      // Define any associations here
    }
  }

  MaterialUnit.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'MaterialUnit',
    tableName: 'MaterialUnits',
    timestamps: false,
  });

  return MaterialUnit;
};

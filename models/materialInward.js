'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class MaterialInward extends Model {
    static associate(models) {
      // Define the association with Client model
      MaterialInward.belongsTo(models.Client, { foreignKey: 'client_id' });
    }
  }

  MaterialInward.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    client_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Clients',
        key: 'id'
      },
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dc_image: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    received_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estimated_dispatch_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    material_numbers: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_quantity_approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    rejection_reason: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    job_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    job_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    material_status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'MaterialInward',
    tableName: 'MaterialInwards',
    timestamps: false // or true, depending on your needs
  });

  return MaterialInward;
};

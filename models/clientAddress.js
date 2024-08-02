'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ClientAddress extends Model {
    static associate(models) {
      // Define association here
      ClientAddress.belongsTo(models.Client, { foreignKey: 'client_id' });
    }
  }

  ClientAddress.init({
    email: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contact: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pincode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    contact_person_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contact_person_mobile: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    contact_person_email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
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
    modelName: 'ClientAddress',
    tableName: 'ClientAddresses',
    timestamps: false
  });

  return ClientAddress;
};

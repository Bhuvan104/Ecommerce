'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Client extends Model {
    static associate(models) {
      // Define association here
      Client.hasMany(models.ClientAddress, { foreignKey: 'client_id' });
    }
  }

  Client.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    client_code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    client_name: {
      type: DataTypes.STRING(100),
      allowNull: false
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
    modelName: 'Client',
    tableName: 'Clients',
    timestamps: false
  });

  return Client;
};

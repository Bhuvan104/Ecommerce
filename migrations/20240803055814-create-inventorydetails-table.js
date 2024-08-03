// migrations/xxxxxx-create-inventory-details.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('inventory_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      material_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'M_Materials',
          key: 'id'
        },
        onDelete: 'CASCADE' // Optional, adjust as needed
      },
      qty: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      used: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('inventory_details');
  }
};

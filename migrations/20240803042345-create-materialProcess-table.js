'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MaterialProcesses', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      material_inward_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MaterialInwards', // Name of the table this key references
          key: 'id'
        },
        allowNull: false
      },
      received_qty: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      assigned_type: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      balance_qty: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      completed_qty: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      assigned_floor: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      assigned_shift: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      manager: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MaterialProcesses');
  }
};

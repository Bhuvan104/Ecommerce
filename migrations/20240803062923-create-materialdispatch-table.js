'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('material_dispatches', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      material_inward_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MaterialInwards',
          key: 'id'
        },
        onDelete: 'CASCADE' // Optional
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
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('material_dispatches');
  }
};

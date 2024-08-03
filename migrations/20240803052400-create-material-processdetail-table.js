'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('material_process_details', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      material_process_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MaterialProcesses', // Ensure this matches your model/table name exactly
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      material_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'M_Materials', // Ensure this matches your model/table name exactly
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      used: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('material_process_details');
  }
};

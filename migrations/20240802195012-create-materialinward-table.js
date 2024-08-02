'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MaterialInwards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients', // The name of the table to reference
          key: 'id'
        },
        onDelete: 'CASCADE',
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dc_image: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      received_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      estimated_dispatch_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      material_numbers: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      is_quantity_approved: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      rejection_reason: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      job_id: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      job_type: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      material_status: {
        type: Sequelize.INTEGER,
        allowNull: true
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MaterialInwards');
  }
};

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClientAddresses', {
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
      email: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      contact: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      address: {
        type: Sequelize.STRING(250),
        allowNull: true
      },
      area: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      pincode: {
        type: Sequelize.STRING(10),
        allowNull: true
      },
      contact_person_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      contact_person_mobile: {
        type: Sequelize.STRING(15),
        allowNull: true
      },
      contact_person_email: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ClientAddresses');
  }
};

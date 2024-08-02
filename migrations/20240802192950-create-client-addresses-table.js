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
          model: 'Clients', // This should match the table name defined in the model
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
    await queryInterface.dropTable('ClientAddresses');
  }
};

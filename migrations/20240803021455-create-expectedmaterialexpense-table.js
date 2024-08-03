'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExpectedMaterialExpenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      material_inward_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'MaterialInwards',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      material: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'M_Materials',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExpectedMaterialExpenses');
  },
};

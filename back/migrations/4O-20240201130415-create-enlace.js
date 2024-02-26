'use strict';
/** @type {import('sequelize-cli').Migration} */
//Óscar
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('enlaces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idSeccion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'secciones'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      textoClave: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('enlaces');
  }
};
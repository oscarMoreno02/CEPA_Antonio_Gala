'use strict';
/** @type {import('sequelize-cli').Migration} */
//Óscar
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('secciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idNoticia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'noticias'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      titulo: {
        allowNull: false,
        type: Sequelize.STRING
      },
      texto: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('secciones');
  }
};
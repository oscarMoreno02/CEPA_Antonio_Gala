//Jaime
///Óscar (cambiado nombre de tablas)

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('aulaFranjas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      turno: {
        allowNull: false,
        type: Sequelize.STRING
      },
      horaInicio: {
        allowNull: false,
        type: Sequelize.TIME(4)
      },
      horaFin: {
        allowNull: false,
        type: Sequelize.TIME(4)
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
    await queryInterface.dropTable('aulaFranjas');
  }
};
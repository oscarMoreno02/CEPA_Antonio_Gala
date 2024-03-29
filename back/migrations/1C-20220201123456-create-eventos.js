/**Laura María Pedraza Gómez */
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('eventos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fecha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hora: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fotoCartel: {
        type: Sequelize.STRING,
        allowNull: false
      },
      mg: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      visibilidad: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      numAsistentes: {
        type: Sequelize.INTEGER,
        allowNull: false
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('eventos');
  }
};
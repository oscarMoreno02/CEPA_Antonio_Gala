//Jaime
//Óscar(cambiado nombre de tablas)

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('aulasReservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAula: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'aulasEspeciales'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      idHorario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'aulasHorarios'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      idProfesor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'usuarios'
          },
          key: 'id'
        },
        onDelete:'CASCADE'
      },
      fecha: {
        allowNull: false,
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('aulasReservas')
  }
}
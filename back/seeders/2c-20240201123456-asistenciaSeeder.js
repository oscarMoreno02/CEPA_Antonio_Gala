'use strict';

const { asistenciasFactory } = require('../factories/asistenciaFactory');

module.exports = {
  async up(queryInterface, Sequelize) {
    const asistencias = await asistenciasFactory(3);
    await queryInterface.bulkInsert('asistencias', asistencias, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('asistencias', null, {});
  }
};
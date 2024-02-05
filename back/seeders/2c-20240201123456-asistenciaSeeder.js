'use strict';

const { asistenciasFactory } = require('../factories/asistenciasFactory');

module.exports = {
  async up(queryInterface, Sequelize) {
    const asistencias = await asistenciasFactory(10);
    await queryInterface.bulkInsert('asistencias', asistencias, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('asistencias', null, {});
  }
};
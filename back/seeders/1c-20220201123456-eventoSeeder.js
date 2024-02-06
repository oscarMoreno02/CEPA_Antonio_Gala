'use strict';

const { eventosFactory } = require('../factories/eventoFactory');

module.exports = {
  async up(queryInterface, Sequelize) {
    const eventos = await eventosFactory(5);
    await queryInterface.bulkInsert('eventos', eventos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('eventos', null, {});
  }
};

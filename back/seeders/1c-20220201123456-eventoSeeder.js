'use strict';

const { eventosFactory } = require('../factories/eventosFactory');

module.exports = {
  async up(queryInterface, Sequelize) {
    const eventos = await eventosFactory(1);
    await queryInterface.bulkInsert('eventos', eventos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('eventos', null, {});
  }
};

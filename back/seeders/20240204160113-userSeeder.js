//Raúl

'use strict';

const { userFactory } = require('../factories/userFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const user = await userFactory(4);
    await queryInterface.bulkInsert('usuarios', user, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};

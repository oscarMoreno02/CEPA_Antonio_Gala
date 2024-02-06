'use strict';

const { userFactory } = require('../factories/userFactory');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const user = await userFactory(4);
    await queryInterface.bulkInsert('user', user, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user', null, {});
  }
};

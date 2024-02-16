'use strict';
const {rolFactory} =require('../factories/rolFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rol = await rolFactory(4);
    await queryInterface.bulkInsert('rols', rol, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('rols', null, {});
  }
};

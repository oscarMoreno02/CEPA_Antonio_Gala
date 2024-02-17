'use strict';
const {aulaEspecialFactory}=require('../factories/aulaEspecialFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const aulaespecials = await aulaEspecialFactory(1);
    await queryInterface.bulkInsert('aulasEspeciales', aulaespecials, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('aulasEspeciales', null, {});
  }
};

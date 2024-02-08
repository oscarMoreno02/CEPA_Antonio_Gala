'use strict';
const {enlacesFactory}=require('../factories/enlacesFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const enlaces = await enlacesFactory(3);
    await queryInterface.bulkInsert('enlaces', enlaces, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('enlaces', null, {});
  }
};

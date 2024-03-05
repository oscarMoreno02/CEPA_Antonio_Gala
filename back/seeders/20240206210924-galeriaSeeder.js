'use strict';
const {galeriaFactory}=require('../factories/galeriaFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const galeria = await galeriaFactory(5);
    await queryInterface.bulkInsert('galerias', galeria, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('galerias', null, {});
  }
};

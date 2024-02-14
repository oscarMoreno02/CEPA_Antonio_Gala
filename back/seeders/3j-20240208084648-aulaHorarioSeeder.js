'use strict';
const {aulaHorarioFactory}=require('../factories/aulaHorarioFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const aulahorarios = await aulaHorarioFactory(1);
    await queryInterface.bulkInsert('aulahorarios', aulahorarios, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('aulahorarios', null, {});
  }
};
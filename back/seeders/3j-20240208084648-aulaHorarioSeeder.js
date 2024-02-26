//Jaime
//Oscar (cambiado nombre de tablas)

'use strict';
const {aulaHorarioFactory}=require('../factories/aulaHorarioFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const aulahorarios = await aulaHorarioFactory(1);
    await queryInterface.bulkInsert('aulasHorarios', aulahorarios, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('aulasHorarios', null, {});
  }
};
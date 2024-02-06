'use strict';
const {seccionesFactory}=require('../factories/seccionesFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const secciones = await seccionesFactory(3,42)
    await queryInterface.bulkInsert('secciones', secciones, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('secciones', null, {});
  }
};

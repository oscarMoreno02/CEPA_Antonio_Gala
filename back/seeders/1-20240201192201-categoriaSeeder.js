'use strict';
const {categoriasFactory}=require('../factories/categoriasFactory')

/** @type {import('sequelize-cli').Migration} */
//Óscar
module.exports = {
  async up (queryInterface, Sequelize) {
    const categorias = await categoriasFactory(18);
    await queryInterface.bulkInsert('categorias', categorias, {});
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('categorias', null, {});
     
  }
};

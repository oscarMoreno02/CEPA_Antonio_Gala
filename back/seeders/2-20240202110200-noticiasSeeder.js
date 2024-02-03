'use strict';
const {noticiasFactory}=require('../factories/noticiasFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const noticias = await noticiasFactory(3,18);
    await queryInterface.bulkInsert('noticias', noticias, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('noticias', null, {});
  }
};

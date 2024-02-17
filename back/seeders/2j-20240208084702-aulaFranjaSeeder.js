'use strict';
const {aulaFranjaFactory}=require('../factories/aulaFranjaFactory')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const aulafranjas = await aulaFranjaFactory(1);
    await queryInterface.bulkInsert('aulaFranjas', aulafranjas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('aulaFranjas', null, {});
  }
};
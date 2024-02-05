'use strict';

const { mensajesChatFactory } = require('../factories/mensajesChatFactory');

module.exports = {
  async up(queryInterface, Sequelize) {
    const mensajesChat = await mensajesChatFactory(1);
    await queryInterface.bulkInsert('mensajesChat', mensajesChat, {});
  },

  async down(query

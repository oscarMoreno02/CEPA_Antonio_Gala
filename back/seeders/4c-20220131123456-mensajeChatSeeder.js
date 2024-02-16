'use strict';

const { mensajesChatFactory } = require('../factories/mensajeChatFactory');

module.exports = {
  async up(queryInterface, Sequelize) {
    const mensajesChat = await mensajesChatFactory(1);
    await queryInterface.bulkInsert('mensajesChats', mensajesChat, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mensajesChats', null, {});
  }
};

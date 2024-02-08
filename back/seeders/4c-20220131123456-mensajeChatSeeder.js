'use strict';

const { mensajesChatFactory } = require('../factories/mensajeChatFactory');

module.exports = {
  async up(queryInterface, Sequelize) {
    const mensajesChat = await mensajesChatFactory(1);
    await queryInterface.bulkInsert('mensajeChats', mensajesChat, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('mensajeChats', null, {});
  }
};

'use strict';

const { chatsFactory } = require('../factories/chatFactory');

module.exports = {
  async up(queryInterface, Sequelize) {
    const chats = await chatsFactory(1); 
    await queryInterface.bulkInsert('chats', chats, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chats', null, {});
  }
};
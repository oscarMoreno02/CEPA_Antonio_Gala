'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const rol = await userFactory(4);
    await queryInterface.bulkInsert('rol', rol, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('rol', null, {});
  }
};

const { Chats } = require('../models');
const faker = require('@faker-js/faker');

const chatsFactory = async (ctos = 1) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let chat = {
            idEvento: faker.random.number({ min: 1, max: 10 }),
            activo: faker.random.boolean(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        factory.push(chat);
    }

    const chats = await Chats.bulkCreate(factory);

    return chats;
};

module.exports = {
    chatsFactory
};
const { Chats } = require('../models');
const faker = require('@faker-js/faker');

const chatsFactory = async (ctos = 1) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let chat = {
            idEvento:1,
            activo: true,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        factory.push(chat);
    }



    return factory;
};

module.exports = {
    chatsFactory
};
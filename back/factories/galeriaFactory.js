const { Galeria } = require('../models');

const galeriaFactory = async (ctos = 1) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let galeria = {
            idEvento: 1,
            foto: `https://picsum.photos/id/237/200/300`
        };
        factory.push(galeria);
    }
    
    return factory;
};

module.exports = {
    galeriaFactory
};
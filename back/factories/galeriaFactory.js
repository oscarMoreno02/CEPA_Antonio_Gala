const { Galeria } = require('../models');
/*Laura María Pedraza Gómez* */
const galeriaFactory = async (ctos = 1) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let galeria = {
            idEvento: 1,
            foto: `https://picsum.photos/id/237/200/300`,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        factory.push(galeria);
    }
    
    return factory;
};

module.exports = {
    galeriaFactory
};
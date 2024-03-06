const { Galeria } = require('../models');
/*Laura María Pedraza Gómez* */
const galeriaFactory = async (ctos = 1) => {
    let factory = [];

    for (let i = 1; i <= ctos; i++) {
        let galeria = {
            idEvento: 1,
            foto: "1d26583f3f9e278d096740d30892c338.jpg",
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
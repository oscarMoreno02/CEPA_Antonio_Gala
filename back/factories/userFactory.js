//Raúl

const bcrypt = require('bcrypt');
const userFactory = async (ctos=4) => {
    
 
    let factory = []
    let lista=[
        {nombre:'Raul', email: 'example@example.com'},
        {nombre:'Oscar', email: 'example1@example.com'},
        {nombre:'Laura', email: 'example2@example.com'},
        {nombre:'Jaime', email: 'example3@example.com'}
    ]
    const password = await bcrypt.hash('1234', 10);
    for(let i = 0; i < ctos; i++) {
        let users = 
            {
            nombre: lista[i].nombre,
            email: lista[i].email,
            password: password,
   
            createdAt: new Date(),
            updatedAt: new Date()
        }
        factory.push(users)
    }
    return Promise.all(factory);
}

module.exports = {
    userFactory
}
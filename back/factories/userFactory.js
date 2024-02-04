const userFactory = async (ctos=4) => {
    
    let factory = []
    let lista=[
        {nombre:'Raul', email: 'example@example.com', password: '1234'},
        {nombre:'Oscar', email: 'example1@example.com', password: '1234'},
        {nombre:'Laura', email: 'example2@example.com', password: '1234'},
        {nombre:'Jaime', email: 'example3@example.com', password: '1234'}
    ]
    for(let i = 0; i < ctos; i++) {
        let users = 
            {
            nombre: lista[i].nombre,
            email: lista[i].email,
            password: lista[i].password,
   
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
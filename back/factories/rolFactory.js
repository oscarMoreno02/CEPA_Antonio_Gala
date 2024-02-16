const rolFactory = async (ctos=4) => {
    
    let factory = []
    let lista=[
        {nombre:'Administrador',},
        {nombre:'Jefe de estudios'},
        {nombre:'Profesor'},
        {nombre:'Usuario'}
    ]
    for(let i = 0; i < ctos; i++) {
        let roles = 
            {
            nombre: lista[i].nombre,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        factory.push(roles)
    }
    return Promise.all(factory);
}

module.exports = {
    rolFactory
}
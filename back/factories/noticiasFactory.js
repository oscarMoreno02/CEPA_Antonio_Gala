const noticiasFactory = async (ctos,categorias) => {
    
    let factory = []
    let ejemplo={
        titulo: 'noticia',
        texto:'texto'
    }

    for(let i = 1; i <= categorias; i++) {
        for(let x = 0; x < ctos; x++) {
          
            let seccion = 
            {
                titulo: ejemplo.titulo,
                idCategoria: i,
                enlace: 'https://github.com/oscarMoreno02/CEPA_Antonio_Gala',
                foto: '4ce3d1e6-dfbe-4d7e-90e3-dc20fd5fdc72.jpeg',
                createdAt: new Date(),
                updatedAt: new Date()
            }
     
            factory.push(seccion)
        }   
    }
    return Promise.all(factory);
}

module.exports = {
    noticiasFactory
}

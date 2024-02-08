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
                foto: 'https://picsum.photos/id/237/200/300',
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

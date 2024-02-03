const seccionesFactory = async (ctos,noticias) => {
    
    let factory = []
    let ejemplo={
        titulo: 'Seccion',
        texto:'texto'
    }

    for(let i = 1; i <= noticias; i++) {
        for(let x = 0; x < ctos; x++) {
            console.log('llega')
            let seccion = 
            {
                titulo: ejemplo.titulo,
                texto: ejemplo.texto,
                idNoticia: i,
                foto: 'https://picsum.photos/id/237/200/300',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            console.log('llega')
            factory.push(seccion)
        }   
    }
    return Promise.all(factory);
}

module.exports = {
    seccionesFactory
}

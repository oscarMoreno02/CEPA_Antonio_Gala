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
                foto: '5411931e-2d94-474b-8721-d9c687167c08.jpeg',
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

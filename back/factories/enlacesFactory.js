const enlacesFactory = async (ctos) => {
    
    let factory = []
    let lista=[
        {texto:'Virgen de Gracia', enlace:'https://cifpvirgendegracia.com/'},
        {texto:'Antonio Gala', enlace:'https://sites.google.com/view/antoniogalacepa/inicio'},
        {texto:'GitHub', enlace:'https://github.com/oscarMoreno02'}]

    for(let i = 1; i < ctos; i++) {
        for(let x = 0; x < lista.length; x++) {
            console.log(lista[x].texto)
        let enlace = 
            {
            textoClave: lista[x].texto,
            url: lista[x].enlace,
            idSeccion: i,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        factory.push(enlace)
        }   
    }
    return Promise.all(factory);
}

module.exports = {
    enlacesFactory
}

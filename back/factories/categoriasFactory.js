const categoriasFactory = async (ctos=18) => {
    
    let factory = []
    let lista=[
        {nombre:'EL CENTRO', dependiente: null},
        {nombre:'ENSEÑANZAS', dependiente: null},
        {nombre:'ERASMUS+', dependiente: null},
        {nombre:'PLAN DE GARANTÍA JUVENIL', dependiente: null},
        {nombre:'PRUEBAS - CURSOS PREPARATORIOS', dependiente: null},
        {nombre:'AULA MENTOR', dependiente: null},
        {nombre:'AMIGOS CEPA', dependiente: null},
        {nombre:'EQUIPO DIRECTIVO', dependiente: 1},
        {nombre:'DOCUMENTOS PROGRAMÁTICOS', dependiente: 1},
        {nombre:'ENSEÑANZAS BASICAS', dependiente: 2},
        {nombre:'ENSEÑANZA SECUNDARIA', dependiente: 2},
        {nombre:'DEPARTAMENTOS', dependiente: 1},
        {nombre:'CURSOS', dependiente: 2},
        {nombre:'CICLO GRADO MEDIO FP', dependiente: 2},
        {nombre:'PROGRAMACION GENERAL ANUAL AULAS', dependiente: 9},
        {nombre:'PLAN DIGITALIZACIÓN', dependiente: 9},
        {nombre:'PRESENCIAL', dependiente: 11},
        {nombre:'DISTANCIA', dependiente: 11},
    ]
    for(let i = 0; i < ctos; i++) {
        let categoria = 
            {
            nombre: lista[i].nombre,
            dependiente: lista[i].dependiente,
   
            createdAt: new Date(),
            updatedAt: new Date()
        }
        factory.push(categoria)
    }
    return Promise.all(factory);
}

module.exports = {
    categoriasFactory
}

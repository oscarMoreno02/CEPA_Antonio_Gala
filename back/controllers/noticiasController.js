const {
    response,
    request
} = require('express');
const Conexion = require('../database/conexionNoticias');
const bcrypt = require('bcrypt');
//Óscar
const listAllNoticias= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllNoticias()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
          
            res.status(404).json()
        })
}

const listNoticia = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getNoticiaById(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
    
            res.status(404).json('No exite un noticia con ese id')
        })
}
const listNoticiasByCategorias= (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllNoticiasByCategoria(req.params.id)
        .then(data => {
            res.status(200).json( data)
        })
        .catch(err => {
    
            res.status(404).json('No exite una categoria con ese id')
        })
}


const editNoticia= (req, res = response)=>{

    const url = new URL(req.url, `http://${req.headers.host}`);
    const queryParams = url.searchParams;
    const publish = queryParams.get('publish');
    const conexion = new Conexion()
    if(publish=='true'){
        if(req.body.publicada==true){
            req.body={publicada:false}
        }else{
            req.body={publicada:true}
        }
    }
        conexion.updateFullNoticia(req.params.id,req.body)
        .then(data => {
            res.status(202).json('Actualizado correctamente')
        })
        .catch(err => {
         
            res.status(203).json('Error al actualizar')
        });
        
}

const createNoticia = (req, res = response) => {
    const conexion = new Conexion()
    conexion.insertNoticia(req.body)
        .then(data => {
            res.status(201).json({id:data})
        })
        .catch(err => {

            res.status(203).json(err)
        })
}

const removeNoticia= (req, res = response) => {
    const conexion = new Conexion()
    conexion.deleteNoticia(req.params.id)
        .then(msg => {

            res.status(202).json('Exito en la eliminacion')
        })
        .catch(err => {

            res.status(203).json('Error en la eliminacion')
        })
}
const listAllNoticiasWithSecciones = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getAllNoticiasWithSecciones()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {

            res.status(404).json()
        })
}
const listNoticiaWithSecciones = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getNoticiaWithSecciones(req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
         
            res.status(404).json()
        })
}

const listUltimasNoticiasWithSecciones = (req, res = response) => {
    const conexion = new Conexion()
    conexion.getUltimasNoticiasWithSecciones()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
 
            res.status(404).json()
        })
}
module.exports={
    listAllNoticias,
    listNoticia,
    removeNoticia,
    editNoticia,
    createNoticia,
    listNoticiasByCategorias,
    listAllNoticiasWithSecciones,
    listNoticiaWithSecciones,
    listUltimasNoticiasWithSecciones
}
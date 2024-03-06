const path = require('path');
const fs   = require('fs');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');
//Óscar
const cargarArchivo = async(req, res = response) => {

    try {
        
        if(!req.files || Object.keys(req.files).length === 0){
            res.status(404).send("No hay archivos para subir");
            return;
        }
        if(!req.files.archivo){
            res.status(404).send("No hay archivos para subir");
            return;
        }
        const nombre = await subirArchivo( req.files, undefined, process.env.CARPETAFOTOSSECCIONES );
        res.json({ url:nombre });


    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const borrarImagen = async(req, res = response ) => {
    const  idborrado = req.params.id;
  
    const pathImagen = path.join( __dirname, '../uploads', process.env.CARPETAFOTOSSECCIONES, idborrado );
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
        res.status(200).json({ msg: "Borrado" });
    } else {
        res.status(404).json({ msg: "Archivo no encontrado" });
    }
}


const actualizarImagen = async(req, res = response ) => {

        const pathImagen = path.join( __dirname, '../uploads', process.env.CARPETAFOTOSSECCIONES,req.params.id);
        if ( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );
        }

    const nombre = await subirArchivo( req.files, undefined, process.env.CARPETAFOTOSSECCIONES );
    res.status(200).json({url:nombre});
}


const obtenerImagen = async(req, res = response ) => {


    
    const nombreArchivo = req.params.id ; 
    if (nombreArchivo) {
        const pathImagen = path.join( __dirname, '../uploads', process.env.CARPETAFOTOSSECCIONES, nombreArchivo );

        if ( fs.existsSync( pathImagen ) ) {
            return res.sendFile( pathImagen )
        }
    }

    const pathImagen = path.join( __dirname, '../assets/no-image.jpg');
    res.sendFile( pathImagen );

}




module.exports = {
    cargarArchivo,
    actualizarImagen,
    obtenerImagen,
    borrarImagen
}
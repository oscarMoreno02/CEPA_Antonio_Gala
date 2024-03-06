const path = require('path');
const fs   = require('fs');
const { v4: uuidv4 } = require('uuid');
const { response } = require('express');
const { subirArchivoRemote } = require('../helpers/subir-archivo');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);
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

          const nombre = await subirArchivoRemote(req.files, undefined, process.env.CARPETAFOTOSSECCIONES);
        res.json({
            url: nombre.secure_url
        });


    } catch (msg) {
        res.status(400).json({ msg });
    }

}


const borrarImagen = async(req, res = response ) => {
    let idborrado = req.params.id;
    idborrado = idborrado.split('.')

    try {
        const uploaded = await cloudinary.uploader.destroy(process.env.CARPETAFOTOSSECCIONES + '/' + idborrado[0]);

        res.json(uploaded);

    } catch (error) {
        res.status(400).json({
            msg: "Error al borrar la imagen en Cloudinary"
        });
    }
}


const actualizarImagen = async(req, res = response ) => {

    let idborrado = req.params.id;
    idborrado = idborrado.split('.')

    try {
        const uploaded = await cloudinary.uploader.destroy(process.env.CARPETAFOTOSSECCIONES + '/' + idborrado[0]);
    } catch (error) {
        
    } finally {

        try {

            if (!req.files || Object.keys(req.files).length === 0) {
                res.status(404).send("No hay archivos para subir");
                return;
            }

            if (!req.files.archivo) {
                res.status(404).send("No hay archivos para subir");
                return;
            }

            const nombre = await subirArchivoRemote(req.files, undefined, process.env.CARPETAFOTOSSECCIONES);
            res.json({
                url: nombre.secure_url
            });


        } catch (msg) {
   
            res.status(400).json({
                msg
            });
        }
    }
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
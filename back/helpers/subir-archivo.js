const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);
const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg'], carpeta = '' ) => {
//Óscar
    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${extensionesValidas}`);
        }
        
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp );
        });

    });

}

const subirArchivoRemote = async (files, extensionesValidas = ['png','jpg','jpeg'], carpeta = '') => {

    return new Promise( async (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${extensionesValidas}`);
        }
        const { tempFilePath } = archivo
        try {
                const uploaded = await cloudinary.uploader.upload(tempFilePath, {
                    folder: carpeta,
                });
                const { secure_url } = uploaded;
                resolve({secure_url});

        } catch (error) {
            reject(error);
        }
    });

}

module.exports = {
    subirArchivo,
    subirArchivoRemote
}
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();


        this.apiUsuarios = '/api/usuario';
        this.apiRoles = '/api/roles'
        this.apiRolesAsignados = '/api/rolesAsignados'

        // this.apiPath = '/api';
        this.categoriasPath = '/api/categorias';
        this.enlacesPath='/api/enlaces'
        this.noticiasPath='/api/noticias'
        this.seccionesPath='/api/secciones'
        this.chatPath = '/api/chat';
        this.eventoPath = '/api/evento';
        this.mensajeChatPath = '/api/mensajeChat';
        this.asistenciaPath = '/api/asistencia';
        this.galeriaPath = '/api/galeria';
        this.uploadsPath  = '/api/uploads/noticias';
        this.middlewares();
        this.routes();
        
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true  
        }));
    }
    routes(){
        this.app.use(this.chatPath , require('../routes/chatRoutes'));
        this.app.use(this.eventoPath , require('../routes/eventoRoutes'));
        this.app.use(this.mensajeChatPath , require('../routes/mensajeChatRoutes'));
        this.app.use(this.asistenciaPath , require('../routes/asistenciaRoutes'));
        this.app.use(this.apiUsuarios , require('../routes/usuarioRutas'))
        this.app.use(this.apiRoles , require('../routes/rolesRutas'))
        this.app.use(this.apiRoles , require('../routes/rolesAsignadosRutas'))
        this.app.use(this.categoriasPath, require('../routes/categoriasRoutes'))
        this.app.use(this.enlacesPath, require('../routes/enlacesRoutes'))
        this.app.use(this.noticiasPath, require('../routes/noticiasRoutes'))
        this.app.use(this.seccionesPath, require('../routes/seccionesRoutes'))
        this.app.use(this.galeriaPath,require('../routes/galeriaRoutes')) 
        this.app.use(this.uploadsPath,  require('../routes/uploadsNoticiasRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
        })
    }
}

module.exports = Server;
const express = require('express');
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
        this.middlewares();
        this.routes();
        
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.apiPath , require('../routes/routes'));
        this.app.use(this.apiUsuarios , require('../routes/usuarioRutas'))
        this.app.use(this.apiRoles , require('../routes/rolesRutas'))
        this.app.use(this.apiRoles , require('../routes/rolesAsignadosRutas'))
        // this.app.use(this.apiPath , require('../routes/routes'));
      
        this.app.use(this.categoriasPath, require('../routes/categoriasRoutes'))
        this.app.use(this.enlacesPath, require('../routes/enlacesRoutes'))
        this.app.use(this.noticiasPath, require('../routes/noticiasRoutes'))
        this.app.use(this.seccionesPath, require('../routes/seccionesRoutes'))
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
        })
    }
}

module.exports = Server;
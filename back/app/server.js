const express = require('express');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        // this.apiPath = '/api';
        this.categoriasPath = '/api/categorias';
        this.enlacesPath='/api/enlaces'
        this.noticiasPath='/api/noticias'
        this.seccionesPath='/api/secciones'
        this.aulasPath='/api/aulas'
        this.middlewares();
        this.routes();
        
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
        // this.app.use(this.apiPath , require('../routes/routes'));
        this.app.use(this.categoriasPath, require('../routes/categoriasRoutes'))
        this.app.use(this.enlacesPath, require('../routes/enlacesRoutes'))
        this.app.use(this.noticiasPath, require('../routes/noticiasRoutes'))
        this.app.use(this.seccionesPath, require('../routes/seccionesRoutes'))
        this.app.use(this.aulasPath, require('../routes/aulasRoutes/'))
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
        })
    }
}

module.exports = Server;
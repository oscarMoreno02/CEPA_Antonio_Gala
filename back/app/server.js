const express = require('express');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        // this.apiPath = '/api';
        this.categoriasPath = '/api/categorias';
        this.enlacesPath='/api/enlaces'
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
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
        })
    }
}

module.exports = Server;
const express = require('express');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.apiPath = '/api';
        this.apiUsuarios = '/api/usuario';
        this.apiRoles = '/api/roles'
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
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
        })
    }
}

module.exports = Server;
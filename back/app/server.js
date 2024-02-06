const express = require('express');
const cors = require('cors');
class Server {
    constructor() {
        this.app = express();
        this.apiPath = '/api';
        this.chatPath = '/api/chat';
        this.eventoPath = '/api/evento';
        this.mensajeChatPath = '/api/mensajeChat';
        this.asistenciaPath = '/api/asistencia';
        this.middlewares();
        this.routes();
        
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
        this.app.use(this.chatPath , require('../routes/chatRoutes'));
        this.app.use(this.eventoPath , require('../routes/eventoRoutes'));
        this.app.use(this.mensajeChatPath , require('../routes/mensajeChatRoutes'));
        this.app.use(this.asistenciaPath , require('../routes/asistenciaRoutes'));
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
        })
    }
}

module.exports = Server;
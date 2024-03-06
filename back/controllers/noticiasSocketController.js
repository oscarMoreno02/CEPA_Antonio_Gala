//Óscar
const noticiasSocketController = (socket) => {
    
    
    socket.on('disconnect', () => {
       
    });

    socket.on('enviar-notificacion', (payload, callback) => {
        socket.broadcast.emit('recibir-notificacion', payload);
    });

  

    socket.on('evento-creado', (payload, callback) => {
        socket.broadcast.emit('enviar-evento', payload);
    });

    
}

module.exports = {
    noticiasSocketController
}
//Raul y Laura -> hemos realizado el websocket para las notificaciones de creación de un evento conjuntamente
const eventosSocketController = (socket) => {
   
    
    socket.on('disconnect', () => {
        
    });

    socket.on('enviar-notificacion', (payload, callback) => {
        socket.broadcast.emit('recibir-notificacion', payload);
    });
}

module.exports = {
    eventosSocketController
}
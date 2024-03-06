//Óscar
const noticiasSocketController = (socket) => {
    console.log("Cliente conectado: ", socket.id); 
    
    socket.on('disconnect', () => {
        console.log("Cliente desconectado", socket.id);
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
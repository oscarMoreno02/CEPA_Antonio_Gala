//Óscar
const noticiasSocketController = (socket) => {
    console.log("Cliente conectado: ", socket.id); 
    
    socket.on('disconnect', () => {
        console.log("Cliente desconectado", socket.id);
    });

    socket.on('enviar-notificacion', (payload, callback) => {
        socket.broadcast.emit('recibir-notificacion', payload);
    });
}

module.exports = {
    noticiasSocketController
}
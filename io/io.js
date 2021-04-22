const io = require('socket.io')();



io.on('connection', socket => {
    console.log('new user connected :)');

    io.emit('new user', {username: socket.handshake.query.username});



    socket.on('new message', data => {
        console.log(data);

        socket.broadcast.emit('new message', {message: data.message, username: socket.handshake.query.username})
        
    })

    

    socket.on('disconnect', () => {
        console.log('user dc', socket.handshake.query.username);
        console.log(socket.id);
        
        io.emit('user dc', {username: socket.handshake.query.username})
    })
});




module.exports = io;
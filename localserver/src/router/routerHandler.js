const router = require('express').Router();
const socket = require('socket.io');
let setup = 0;

const states = {
    client: false,
    theia: false,
}
function routerSetup(http) {
    const soc = socket(http);
    const ioClient = soc.of('/client');
    const ioTheia = soc.of('/theia');
    const iocam = soc.of('/cam');
    let clientSocket;
    let theiaSocket;
    ioClient.on('connection', (socket) => {
        console.log('client connected');
        clientSocket = socket;
        try {
            socket.on('y', (y) => theiaSocket.emit('theiay', y));
            socket.on('x', (x) => theiaSocket.emit('theiax', x));
        } catch{ }
        socket.emit('theia-state', Boolean(theiaSocket));
    });

    ioTheia.on('connection', (socket) => {
        console.log('theia connected');
        theiaSocket = socket;
        try {
            clientSocket.emit('theia-state', '1');
        } catch  { }
        socket.on('disconnect', () => {
            console.log('theia disconnected')
            try { clientSocket.emit('theia-state', '0'); } catch  { }
        });
        

    })
    iocam.on('connection',(socket)=>{
        socket.on('cam', i => {
            try { socket.broadcast.emit('camclient', i); } catch  { }
        })
    })

}
function routerHandler(http) {
    if (!setup) routerSetup(http);
    return router
}

module.exports = routerHandler;
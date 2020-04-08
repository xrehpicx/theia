const wheels = require('./src/motorControl')();
const socket = require('socket.io-client')('http://theiax.herokuapp.com/com');
const camera = require('./src/camera');

wheels.init();

socket.on('connect', function () {
    console.log('connected to server');
    socket.emit('theia-state','hey')
});

socket.on('theiay', function (y) {
    y = Number(y);
    console.log(y);
    wheels.goy(y)

});

socket.on('theiax', function (x) {
    x = Number(x);
    console.log(x);
    wheels.gox(x)
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

//camera(socket);






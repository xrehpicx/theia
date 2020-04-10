console.log('starting theia');
const wheels = require('./src/motorControl')();
const socket = require('socket.io-client')('http://theiax.herokuapp.com/theia');
const camsocket = require('socket.io-client')('http://theiax.herokuapp.com/cam');
/* const socket = require('socket.io-client')('http://192.168.29.16:8000/theia'); */
const camera = require('./src/camera');
const localServer = require('./server/theia-server')();

const localSocket = require('socket.io-client')('http://raspberrypi.local/theia');
const localCamSocket = require('socket.io-client')('http://raspberrypi.local/cam');

wheels.init();
socket.on('connect', function () {
    console.log('connected to server');
    socket.emit('theia-state', '1');
});

socket.on('theiay', function (y) {
    y = Number(y);
    /* console.log(y); */
    wheels.goy(y)

});

socket.on('theiax', function (x) {
    x = Number(x);
    /* console.log(x); */
    wheels.gox(x)
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

camera.init(camsocket, localCamSocket);

localSocket.on('connect', function () {
    console.log('connected to server');
    socket.emit('theia-state', '1');
});

localSocket.on('theiay', function (y) {
    y = Number(y);
    /* console.log(y); */
    wheels.goy(y)

});

localSocket.on('theiax', function (x) {
    x = Number(x);
    /* console.log(x); */
    wheels.gox(x)
});

localSocket.on('disconnect', function () {
    console.log('disconnected from server');
});






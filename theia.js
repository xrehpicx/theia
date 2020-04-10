console.log('starting theia');
const wheels = require('./src/motorControl')();
const io = require('socket.io-client');
const socket = io('http://theiax.herokuapp.com/theia');
const camsocket = io('http://theiax.herokuapp.com/cam');

require('./localserver/theia-server')(); //runs local server

const localsocket = io('http://localhost:8000/theia');
const localcamsocket = io('http://localhost:8000/cam');
const camera = require('./src/camera');

wheels.init();

socket.on('connect', function () {
    console.log('connected to server');
    socket.emit('theia-state', true);
});

socket.on('theiay', function (y) {
    y = Number(y);
    wheels.goy(y)

});

socket.on('theiax', function (x) {
    x = Number(x);
    wheels.gox(x)
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});


localsocket.on('connect', function () {
    console.log('connected to server');
    socket.emit('theia-state', true);
});

localsocket.on('theiay', function (y) {
    y = Number(y);
    wheels.goy(y)

});

localsocket.on('theiax', function (x) {
    x = Number(x);
    wheels.gox(x)
});

localsocket.on('disconnect', function () {
    console.log('disconnected from server');
});

camera.init(camsocket,localcamsocket);







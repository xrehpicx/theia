const wheels = require('./src/motorControl')();
const socket = require('socket.io-client')('http://theiax.herokuapp.com/');

socket.on('connect', function () {
    console.log('connected');
});

socket.on('theiay', function (y) {
    console.log(Number(y));
});

socket.on('theiax', function (x) {
    console.log(Number(x));
});

socket.on('disconnect', function () {
    console.log('disconnected');
});

wheels.init();






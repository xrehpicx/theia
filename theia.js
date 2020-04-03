const wheels = require('./src/motorControl')();
const socket = require('socket.io-client')('http://theiax.herokuapp.com/');

socket.on('connect', function () {
    console.log('connected');
});

socket.on('debug', function (data) {
    console.log(data);
});

socket.on('disconnect', function () {
    console.log('disconnected');
});

wheels.init();






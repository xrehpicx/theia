const wheels = require('./src/motorControl')();
const socket = require('socket.io-client')('http://theiax.herokuapp.com/com');


wheels.init();

socket.on('connect', function () {
    console.log('connected');
});

socket.on('theiay', function (y) {
    y = Number(y);
    console.log(y);
    wheels.goy(y)

});

socket.on('theiax', function (x) {
    x = Number(x);
    console.log(x);
    wheels.goy(x)
});

socket.on('disconnect', function () {
    console.log('disconnected');
});








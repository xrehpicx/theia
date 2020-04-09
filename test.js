const fs = require('fs');
const socket2 = require('socket.io-client')('http://theiax.herokuapp.com/theia');
const socket = require('socket.io-client')('http://theiax.herokuapp.com/cam');
const raspberryPiCamera = require('raspberry-pi-camera-native');

let count = 0;
socket.on('connect', () => {
    socket2.emit('theia-state', '1');
    console.log('connected')
    raspberryPiCamera.on('frame', (frameData) => {
        
        socket.on('connection', () => console.log('connected'));
        
        socket.emit('cam', frameData);
    
    });
    raspberryPiCamera.start({
        width: 352,
        height: 240,
        fps: 20,
        quality: 8,
        encoding: 'JPEG'
    });
})



/* const socket2 = require('socket.io-client')('http://theiax.herokuapp.com/theia');
const socket = require('socket.io-client')('http://theiax.herokuapp.com/cam'); */
const raspberryPiCamera = require('raspberry-pi-camera-native');
module.exports = {
    init: (socket) => {

        socket.on('connect', () => {
            console.log('connected')
            raspberryPiCamera.on('frame', (frameData) => {

                socket.on('connection', () => console.log('connected'));

                socket.emit('cam', frameData);

            });
            raspberryPiCamera.start({
                width: 720,
                height: 480,
                fps: 20,
                quality: 5,
                encoding: 'JPEG'
            });
        })
    }
}
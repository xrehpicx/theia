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
                width: 352,
                height: 240,
                fps: 20,
                quality: 8,
                encoding: 'JPEG'
            });
        })
    }
}
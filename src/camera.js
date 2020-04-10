/* const socket2 = require('socket.io-client')('http://theiax.herokuapp.com/theia');
const socket = require('socket.io-client')('http://theiax.herokuapp.com/cam'); */
const raspberryPiCamera = require('raspberry-pi-camera-native');
module.exports = {
    init: (socket, localSocket) => {

        socket.on('connect', () => {
            console.log('connected')
            raspberryPiCamera.on('frame', async (frameData) => {

                socket.on('connection', () => console.log('connected'));

                (async () => socket.emit('cam', frameData))();
                (async () => { if (localSocket) localSocket.emit('cam', frameData) })();

            });
            raspberryPiCamera.start({
                width: 352,
                height: 240,
                fps: 20,
                quality: 10,
                encoding: 'JPEG'
            });
        });
    }
}
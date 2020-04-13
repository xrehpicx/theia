const raspberryPiCamera = require('raspberry-pi-camera-native');
module.exports = {
    setup: false,
    init: function (socket, localSocket) {
        if (!this.setup) {
            socket.on('connect', () => {
                console.log('connected');
                this.setup = true;
                raspberryPiCamera.on('frame', async (frameData) => {

                    socket.on('connection', () => console.log('connected'));
                    raspberryPiCamera.pause();
                    socket.emit('cam', frameData)
                    if (localSocket) localSocket.emit('cam', frameData);
                    raspberryPiCamera.resume();

                });
                console.log('starting camera');
                raspberryPiCamera.start({
                    width: 352,
                    height: 240,
                    fps: 20,
                    quality: 10,
                    encoding: 'JPEG'
                });
            });
        } else {
            console.log('camera already setup');
        }

    }
}
const raspberryPiCamera = require('raspberry-pi-camera-native');
module.exports = {
    setup: false,
    init: function (socket, localSocket) {
        if (!this.setup) {
            this.setup = true;
            socket.on('connect', () => {
                raspberryPiCamera.on('frame', (frameData) => {

                    raspberryPiCamera.pause(() => console.log('paused'));

                    socket.emit('cam', frameData)
                    if (localSocket) localSocket.emit('cam', frameData);
                    raspberryPiCamera.resume(() => console.log('resumed'));


                });
                console.log('starting camera');
                raspberryPiCamera.start({
                    width: 352,
                    height: 240,
                    fps: 30,
                    quality: 10,
                    encoding: 'JPEG'
                });
            });
        } else {
            console.log('camera already setup');
        }

    }
}
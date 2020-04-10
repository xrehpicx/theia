const raspberryPiCamera = require('raspberry-pi-camera-native');

raspberryPiCamera.on('frame', (frameData) => {
    postMessage(frameData);
});

raspberryPiCamera.start({
    width: 352,
    height: 240,
    fps: 20,
    quality: 10,
    encoding: 'JPEG'
});
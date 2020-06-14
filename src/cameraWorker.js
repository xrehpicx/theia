console.log('worker started');
const raspberryPiCamera = require('raspberry-pi-camera-native');
console.log('cam library inported');
raspberryPiCamera.on('frame', (frameData) => {
    console.log('sending frame');
    postMessage(frameData);
});

raspberryPiCamera.start({
    width: 352,
    height: 240,
    fps: 20,
    quality: 10,
    encoding: 'JPEG'
});

console.log('camera started');
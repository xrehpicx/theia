const fs = require('fs');
const socket = require('socket.io-client')('http://theiax.herokuapp.com/theia');
const raspberryPiCamera = require('raspberry-pi-camera-native');

let count = 0;

raspberryPiCamera.on('frame', (frameData) => {
    //const filename = 'img' + (count + '').padStart(3, '0') + '.jpg';
    //console.log('writing file: ', filename);
    /* console.log(frameData.toString('base64')); */
    socket.emit('cam', frameData.toString('base64'));
    /* fs.writeFile(filename, frameData, (err) => {
        if (err) {
            throw err;
        }

        count++;
    }); */
});

raspberryPiCamera.start({
    width: 1920,
    height: 1080,
    fps: 1,
    quality: 50,
    encoding: 'JPEG'
});


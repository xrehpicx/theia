const fs = require('fs');
const socket2 = require('socket.io-client')('http://theiax.herokuapp.com/theia');
const socket = require('socket.io-client')('http://theiax.herokuapp.com/cam');
const raspberryPiCamera = require('raspberry-pi-camera-native');

let count = 0;
socket.on('connect',()=>{
    socket2.emit('theia-state', '1');
    console.log('connected')
    raspberryPiCamera.on('frame', (frameData) => {
        //const filename = 'img' + (count + '').padStart(3, '0') + '.jpg';
        //console.log('writing file: ', filename);
        /* console.log(frameData.toString('base64')); */
        socket.on('connection', () => console.log('connected'));
        socket.emit('cam', frameData.toString('base64'));
        /* console.log('img sent'); */
        /* fs.writeFile(filename, frameData, (err) => {
            if (err) {
                throw err;
            }
    
            count++;
        }); */
    });
    raspberryPiCamera.start({
        width: 1920 / 2,
        height: 1080 / 2,
        fps: 20,
        quality: 50,
        encoding: 'JPEG'
    });
})



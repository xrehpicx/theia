const { StillCamera } = require("pi-camera-connect");

module.exports = (socket) => {
    const stillCamera = new StillCamera();
    setInterval(() => {
        stillCamera.takeImage().then(image => {
            socket.emit('cam', image.toString('base64'));
        }).catch(e => console.log('camera failed'));
    }, 1000);

}
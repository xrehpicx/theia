const { StreamCamera, Codec } = require("pi-camera-connect");

module.exports = (socket) => {
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG
    });
    setInterval(() => {
        streamCamera.takeImage().then(image => {
            socket.emit('cam', image.toString('base64'));
        }).catch(e => console.log('camera failed'));
    }, 1000);

}
const { StreamCamera, Codec } = require("pi-camera-connect");

module.exports = (socket) => {
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG
    });
    /* setInterval(async () => {
        await streamCamera.startCapture();
        const image = await streamCamera.takeImage();
        socket.emit('cam', image.toString('base64'));
        await streamCamera.stopCapture();
    }, 1000); */
    streamCamera.startCapture().then(() => {
        console.log('capture started');
        streamCamera.takeImage().then((img) => {
            console.log('image captured');
            streamCamera.stopCapture().then(() => {
                console.log('capture stopped');
            });
        })
    })






}



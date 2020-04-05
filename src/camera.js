const { StreamCamera, Codec } = require("pi-camera-connect");

module.exports = async (socket) => {
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG
    });
    /* setInterval(async () => {
        await streamCamera.startCapture();
        const image = await streamCamera.takeImage();
        socket.emit('cam', image.toString('base64'));
        await streamCamera.stopCapture();
    }, 1000); */
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG
    });

    await streamCamera.startCapture();

    const image = await streamCamera.takeImage();

    // Process image...

    await streamCamera.stopCapture();


}
const runApp = async () => {


};


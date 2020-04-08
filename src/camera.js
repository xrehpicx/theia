const { StreamCamera, Codec } = require("pi-camera-connect");

module.exports =async (socket) => {
    const streamCamera = new StreamCamera({
        codec: Codec.MJPEG
    });
    await streamCamera.startCapture();

    const image = await streamCamera.takeImage();

    await streamCamera.stopCapture();

    /* setInterval(async () => {
        await streamCamera.startCapture();
        const image = await streamCamera.takeImage();
        socket.emit('cam', image.toString('base64'));
        await streamCamera.stopCapture();
    }, 1000); */

}
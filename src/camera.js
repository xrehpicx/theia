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


    await streamCamera.startCapture();
    console.log('capture started');
    const image = await streamCamera.takeImage();
    console.log('img captured');
    /* console.log(image.toString('base64')); */
    // Process image...

    await streamCamera.stopCapture();
    console.log('capture stopped');

}



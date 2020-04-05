const { StreamCamera, Codec } = require("pi-camera-connect");

module.exports = (socket) => {
    const streamCamera = new StreamCamera({
        codec: Codec.H264
    });
    /* setInterval(async () => {
        await streamCamera.startCapture();
        const image = await streamCamera.takeImage();
        socket.emit('cam', image.toString('base64'));
        await streamCamera.stopCapture();
    }, 1000); */
    
    const videoStream = streamCamera.createStream();
    streamCamera.startCapture().then(()=>{
        videoStream.on("data", data => console.log("New data", data));
        /* streamCamera.stopCapture(); */
    })




}



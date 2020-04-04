const { StillCamera } = require("pi-camera-connect");

module.exports = (socket) => {
    const stillCamera = new StillCamera();
    setInterval(() => {
        stillCamera.takeImage().then(image => {
            socket.on('cam', image.toString('base64'));
            /* console.log(image.toString('base64')); */
        });
    }, 5000);

}
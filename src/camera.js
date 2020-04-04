const { StillCamera } = require("pi-camera-connect");

module.exports = () => {
    const stillCamera = new StillCamera();
    stillCamera.takeImage().then(image => {
        console.log(image.toString('base64'));
    });
    return stillCamera;
}
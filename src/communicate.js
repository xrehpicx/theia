console.log('establishing comm');
const wheels = require('./motorControl')();
const io = require('socket.io-client');
const camera = require('./camera');
const localServer = require('../localserver/theia-server');

function Comm() {
    const socket = io('http://theiax.herokuapp.com/theia');
    const camsocket = io('http://theiax.herokuapp.com/cam');

    const localsocket = io('http://localhost:8000/theia');
    const localcamsocket = io('http://localhost:8000/cam');

    return {
        init: function () {
            wheels.init();
            this.localSocketInit(() => camera.init(camsocket, localcamsocket));
            this.socketInit(() => camera.init(camsocket, localcamsocket));
        },
        socketInit: function (callback) {
            socket.on('connect', function () {
                console.log('connected to online server');
                socket.emit('theia-state', true);

                socket.on('theiay', function (y) {
                    y = Number(y);
                    wheels.goy(y)
                });

                socket.on('theiax', function (x) {
                    x = Number(x);
                    wheels.gox(x)
                });

                socket.on('disconnect', function () {
                    console.log('disconnected from online server');
                });
                callback();
            });

        },
        localSocketInit: function (callback) {
            localServer();
            localsocket.on('connect', function () {
                console.log('connected to local server');
                socket.emit('theia-state', true);

                localsocket.on('theiay', function (y) {
                    y = Number(y);
                    wheels.goy(y)

                });

                localsocket.on('theiax', function (x) {
                    x = Number(x);
                    wheels.gox(x)
                });

                localsocket.on('disconnect', function () {
                    console.log('disconnected from local server');
                });
                callback();

            });

        }
    }
}

module.exports = Comm();
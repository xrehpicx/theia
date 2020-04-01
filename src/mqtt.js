const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://157.245.111.162');


client.on('connect', function () {
    client.subscribe('debug', function (err) {
        if (!err) {
            console.log('sub to debug');
            client.publish('debug', 'theia script has started');
        }
    });
    client.subscribe('y');
    client.subscribe('t');
})

client.on('message', function (topic, message) {
    // message is Buffer
    if (topic === 'debug') {
        str = message.toString();
        console.log();
        let pars = str.split(' ');
        let s = Number(pars[0]);
        let t = Number(pars[1]);
        updateControl(s, t);
    }
    else if (topic === 'y') {
        state = Number(message.toString());
        y(state, 1);
    }
    else if (topic === 't') {
        state = Number(message.toString());
        teta(state, 1);
    }
    else if (topic === 'reset') {
        state = Number(message.toString());
        console.log('reset');
        if (state) reset();
    }
});


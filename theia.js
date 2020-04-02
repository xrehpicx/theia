
const Gpio = require('pigpio').Gpio;
const wheels = require('./src/motorControl')(Gpio);
console.log(wheels);
//wheels.test()

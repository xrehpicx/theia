const wheels = require('./src/motorControl')();
const a = {
    c: 10,
    cc: 9,
    e: 27,
}
const b = {
    cc: 23,
    c: 24,
    e: 22,
}
wheels.init(a, b);
/* console.log(wheels.test()); */
wheels.set(200, 0);
setTimeout(wheels.reset, 1000);


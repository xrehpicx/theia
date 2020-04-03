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
(async ()=>{
    wheels.reset();
    await delay(1000);
    wheels.set(200);
    await delay(1000);
    wheels.set(200,255);
    await delay(1000);
    wheels.reset();
})();



function delay(duration) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, duration)
    });
};
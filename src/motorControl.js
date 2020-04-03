const Gpio = require('pigpio').Gpio;
module.exports = function () {

    const worker = {
        test: () => console.log(worker),
        init: (a, b) => {
            /* PAIR A */
            worker.ac = new Gpio(a.c, { mode: Gpio.OUTPUT });
            worker.acc = new Gpio(a.cc, { mode: Gpio.OUTPUT });
            /* PAIR B */
            worker.bc = new Gpio(b.c, { mode: Gpio.OUTPUT });
            worker.bcc = new Gpio(b.cc, { mode: Gpio.OUTPUT });
            /* ENABLES FOR BOTH PAIRS */
            worker.ea = new Gpio(a.e, { mode: Gpio.OUTPUT });
            worker.eb = new Gpio(b.e, { mode: Gpio.OUTPUT });

            worker.ea.pwmWrite(0);
            worker.eb.pwmWrite(0);
            worker.yspeed = 0;
        },
        reset: () => {
            worker.ea.pwmWrite(0);
            worker.eb.pwmWrite(0);
            worker.ac.digitalWrite(0);
            worker.bc.digitalWrite(0);
            worker.acc.digitalWrite(0);
            worker.bcc.digitalWrite(0);
            console.log('reset');
        },
        val: (in11, in12, in21, in22, pwm1, pwm2) => {
            ac.digitalWrite(in11);
            acc.digitalWrite(in12);

            bc.digitalWrite(in21);
            bcc.digitalWrite(in22);


            ea.pwmWrite(pwm1);
            eb.pwmWrite(pwm2);
        },
        set: (speed, angularVelocity) => {
            let new_aSpeed = speed * Math.cos(angularVelocity * 2 * (angularVelocity < 0) * 3.1415926535897932384626 / 510);
            let new_bSpeed = speed * Math.cos(angularVelocity * 2 * (angularVelocity >= 0) * 3.1415926535897932384626 / 510);

            const acValue = new_aSpeed > 0;
            const accValue = new_aSpeed <= 0;

            const bcValue = new_bSpeed > 0;
            const bccValue = new_bSpeed <= 0;

            new_aSpeed = Math.floor(Math.abs(new_aSpeed));
            new_bSpeed = Math.floor(Math.abs(new_bSpeed));

            worker.val(acValue, accValue, bcValue, bccValue, new_aSpeed, new_bSpeed);
        }
    }
    return worker;
}
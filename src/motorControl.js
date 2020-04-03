const Gpio = require('pigpio').Gpio;
module.exports = function () {

    return {
        test: () => console.log(this.val),
        init: (a, b) => {
            /* PAIR A */
            this.ac = new Gpio(a.c, { mode: Gpio.OUTPUT });
            this.acc = new Gpio(a.cc, { mode: Gpio.OUTPUT });
            /* PAIR B */
            this.bc = new Gpio(b.c, { mode: Gpio.OUTPUT });
            this.bcc = new Gpio(b.cc, { mode: Gpio.OUTPUT });
            /* ENABLES FOR BOTH PAIRS */
            this.ea = new Gpio(a.e, { mode: Gpio.OUTPUT });
            this.eb = new Gpio(b.e, { mode: Gpio.OUTPUT });

            this.ea.pwmWrite(0);
            this.eb.pwmWrite(0);
            this.yspeed = 0;
        },
        reset: () => {
            this.ea.pwmWrite(0);
            this.eb.pwmWrite(0);
            this.ac.digitalWrite(0);
            this.bc.digitalWrite(0);
            this.acc.digitalWrite(0);
            this.bcc.digitalWrite(0);
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

            this.val(acValue, accValue, bcValue, bccValue, new_aSpeed, new_bSpeed);
        }
    }

}
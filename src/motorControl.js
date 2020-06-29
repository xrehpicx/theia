const Gpio = require('pigpio').Gpio;
var Worker = require('webworker-threads').Worker;
module.exports = function () {
    
    const as = {
        c: 10,
        cc: 9,
        e: 27,
    }
    const bs = {
        cc: 23,
        c: 24,
        e: 22,
    }
    const processor = new Worker(__dirname + '/xyWorker.js');
    return {
        test: function () { console.log(this) },
        init: function (a = as, b = bs) {
            /* PAIR A */
            this.ac = new Gpio(a.c, { mode: Gpio.OUTPUT });
            this.acc = new Gpio(a.cc, { mode: Gpio.OUTPUT });
            /* PAIR B */
            this.bc = new Gpio(b.c, { mode: Gpio.OUTPUT });
            this.bcc = new Gpio(b.cc, { mode: Gpio.OUTPUT });
            /* ENABLES FOR BOTH PARTS */
            this.ea = new Gpio(a.e, { mode: Gpio.OUTPUT });
            this.eb = new Gpio(b.e, { mode: Gpio.OUTPUT });

            this.ea.pwmWrite(0);
            this.eb.pwmWrite(0);
            this.yspeed = 0;
            this.xspeed = 0;
        },
        reset: function () {
            this.ea.pwmWrite(0);
            this.eb.pwmWrite(0);
            this.ac.digitalWrite(0);
            this.bc.digitalWrite(0);
            this.acc.digitalWrite(0);
            this.bcc.digitalWrite(0);

        },
        val: function (in11, in12, in21, in22, pwm1, pwm2) {
            this.ac.digitalWrite(in11);
            this.acc.digitalWrite(in12);

            this.bc.digitalWrite(in21);
            this.bcc.digitalWrite(in22);

            this.ea.pwmWrite(pwm1);
            this.eb.pwmWrite(pwm2);
        },
        set: function (speed = 0, angularVelocity = 0) {
            if (speed) {
                processor.postMessage({ speed, angularVelocity });
                const onmessage = data => {

                    let new_aSpeed = data.data.new_aSpeed;
                    let new_bSpeed = data.data.new_bSpeed;

                    const acValue = new_aSpeed > 0;
                    const accValue = new_aSpeed <= 0;

                    const bcValue = new_bSpeed > 0;
                    const bccValue = new_bSpeed <= 0;

                    new_aSpeed = Math.floor(Math.abs(new_aSpeed));
                    new_bSpeed = Math.floor(Math.abs(new_bSpeed));

                    this.val(acValue, accValue, bcValue, bccValue, new_aSpeed, new_bSpeed);
                }
                processor.onmessage = onmessage.bind(this);
            } else {
                this.reset();
            }


        },
        gox: function (x) {
            x = Number(x);
            if (this.xspeed !== x) {
                this.xspeed = x;
                this.set(this.yspeed, this.xspeed);
            }
        },
        goy: function (y) {
            y = Number(y);
            if (this.yspeed !== y) {
                this.yspeed = y;
                this.set(this.yspeed, this.xspeed);
            }
        }
    }

}

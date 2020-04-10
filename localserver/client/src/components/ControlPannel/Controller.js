import React, { useEffect, useContext } from 'react';

import nipplejs from 'nipplejs';
import socketIOClient from "socket.io-client";
import { AuthContext } from '../../contexts/AuthContext'

import greenlet from 'greenlet'
/* const socket = socketIOClient('http://localhost:8000/client'); */

const socket = socketIOClient('http://theiax.herokuapp.com/client');
const camsocket = socketIOClient('http://theiax.herokuapp.com/cam');
let setTheia;
const controllers = {};





const remote = function (left, right) {
    camsocket.on('connect', () => {
        let img = document.querySelector('.feed');
        function _arrayBufferToBase64(buffer) {
            var binary = '';
            var bytes = new Uint8Array(buffer);
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return btoa(binary);
        }
        const getimg = greenlet(_arrayBufferToBase64);
        camsocket.on('camclient', (i) => {
            getimg(i).then(data=>{
                img.setAttribute(
                    'src', 'data:image/jpeg;base64,' + data
                );
            })
            
        })
    })

    socket.on('connect', () => console.log('connected'));
    socket.on('theia-state', (d) => {
        console.log((Boolean(Number(d))));
        window.THEIA = (Boolean(Number(d)));
        try {
            setTheia(Boolean(Number(d)));
        } catch  { }
    })

    function x(rad) {
        let pRad = 0;
        if (pRad !== rad) {
            socket.emit('x', rad);
            pRad = rad;
        }
    }
    function y(speed) {
        let pSpeed = 0;
        if (pSpeed !== speed) {
            socket.emit('y', speed);
            pSpeed = speed;
        }
    }
    function setupLeftNipple(root) {
        const optionsleft = {
            zone: root || document.querySelector('.left'),
            mode: 'dynamic',
            position: { left: '25%', top: '50%' },
            color: 'black',
            size: 200,
            lockY: true
        }
        if (!controllers.left) {
            let leftmanager = nipplejs.create(optionsleft);
            leftmanager.on('move', (e, d) => {
                let speed = Math.floor(d.vector.y * 255) + '';
                y(speed);
            });
            leftmanager.on('end', () => socket.emit('y', 0));
            controllers.left = leftmanager;
        }
    }
    function setupRightNipple(root) {
        const optionsright = {
            zone: root || document.querySelector('.right'),
            mode: 'dynamic',
            position: { right: '25%', top: '50%' },
            color: 'grey',
            size: 200, lockX: true
        }
        if (!controllers.right) {
            let rightmanager = nipplejs.create(optionsright);

            rightmanager.on('move', (e, d) => {
                let rad = Math.floor(d.vector.x * 255) + '';
                x(rad);
            });
            rightmanager.on('end', () => socket.emit('x', 0));
            controllers.right = rightmanager;
        }

    }


    function wasdf() {
        // Arrow key codes
        const UP = 38,
            DOWN = 40,
            RIGHT = 39,
            LEFT = 37,
            SPACE = 32;
        //wasd keycodes

        const W = 87,
            A = 65,
            S = 83,
            D = 68;

        let maxyspeed = 200;
        let maxxspeed = 140;
        document.addEventListener('keydown', event => {
            if ((event.keyCode === UP) || (event.keyCode === W)) {
                if (!event.shiftKey) y(maxyspeed);
                else y(255);

            }
            if ((event.keyCode === LEFT) || (event.keyCode === A)) {
                x(-maxxspeed);

            }
            if ((event.keyCode === DOWN) || (event.keyCode === S)) {
                if (!event.shiftKey) y(-maxyspeed);
                else y(-255);

            }
            if ((event.keyCode === RIGHT) || (event.keyCode === D)) {
                x(maxxspeed);

            }
        }, false);
        document.addEventListener('keydown', event => {
            if (event.keyCode === SPACE) {
                maxxspeed = 255;
            }
        });
        document.addEventListener('keyup', event => {
            if (event.keyCode === SPACE) {
                maxxspeed = 140;
            }
        })
        document.addEventListener('keyup', event => {
            if ((event.keyCode === UP) || (event.keyCode === W)) {
                y('0');
                console.log('left')
            }
            if ((event.keyCode === LEFT) || (event.keyCode === A)) {
                x('0')
            }
            if ((event.keyCode === DOWN) || (event.keyCode === S)) {
                y('0');
            }
            if ((event.keyCode === RIGHT) || (event.keyCode === D)) {
                x('0');
            }
        }, false);


    }

    return {
        setup: 0,
        init: function (left, right) {

            setupLeftNipple(left);
            setupRightNipple(right);
            wasdf();
            this.setup = 1;


        }
    }

}

export const Controller = () => {

    setTheia = useContext(AuthContext)[3];
    const auth = useContext(AuthContext)[0];
    const theia = useContext(AuthContext)[2];
    useEffect(() => {
        const rem = remote();
        try {
            setTheia(window.THEIA);
            rem.init();
        } catch  { }
    }, [auth]);

    return (
        <div className="controller" style={{ display: theia ? '' : 'none' }}>
            <div className="left"></div><img className="feed" alt="" />
            <div className="right"></div>
        </div>
    )


}






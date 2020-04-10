import React, { useContext, useState } from 'react'

import Fullscreen from "react-full-screen";
import { AuthContext } from '../../contexts/AuthContext'
import { Controller } from './Controller'

import './css/controller.css'
export default function ControlPannel() {
    const setAuth = useContext(AuthContext)[1];
    const theiaState = useContext(AuthContext)[2];
    const [full, setFull] = useState(false);
    return (
        <Fullscreen
            enabled={full}
            onChange={full => setFull(full)}>
            <div className="control-pannel">
                <nav>
                    <h1>theia <span style={{ color: theiaState ? 'skyblue' : 'var(--red-accent)' }}>is {theiaState ? 'online' : 'offline'}</span></h1>
                    <ul>
                        <li className="fullscr" onClick={() => setFull(true)}>Fullscreen</li>
                        <li onClick={() => setAuth(false)}>log out</li>
                    </ul>
                </nav>
                
                <Controller />
            </div>

        </Fullscreen>
    );
}
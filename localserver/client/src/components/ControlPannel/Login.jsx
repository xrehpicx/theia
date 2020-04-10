import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import './css/form.css'
function Login() {
    let pwd;
    useEffect(() => {
        document.querySelector('.login').style.transform = 'translateY(0px)';
        document.querySelector('.login').style.opacity = '1';
    })
    const setAuth = useContext(AuthContext)[1];

    const checker = () => {
        if (pwd === 'olive') {
            document.querySelector('.login').style.transform = 'translateY(-50px)';
            document.querySelector('.login').style.opacity = '0';
            setTimeout(setAuth, 400, true);
        }
    }
    const handlePassword = (event) => {
        pwd = event.target.value;
        checker();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        checker();
    }
    
    return (
        <div className="login">
            <h1>theia</h1>
            <h2>Control Pannel</h2>
            <form styel={{ width: 'auto' }} onSubmit={handleSubmit}>
                <div className="text-ip">
                    <input onChange={handlePassword} autoComplete="off" required type="password" />
                    <label><span>password</span></label>
                </div>
                <button style={{ height: 30, width: 60, paddingRight: 10, paddingLeft: 10 }} type="submit">send</button>
            </form>
        </div>
    );

}

export default Login;
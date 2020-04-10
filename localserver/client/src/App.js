import React, { useContext } from 'react';

import ControlPannel from './components/ControlPannel/ControlPannel'
import Login from './components/ControlPannel/Login';

import { AuthContext } from './contexts/AuthContext';

import './App.css';

function App() {
  const auth = useContext(AuthContext)[0];
  return (auth ? <ControlPannel /> : <Login />)

}

export default App;

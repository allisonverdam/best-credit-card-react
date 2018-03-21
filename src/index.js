import React from 'react';
import { render } from 'react-dom'
import { Router, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import App from './components/app';

import Login from './components/auth/login'
import Cartoes from './components/cartoes/cartoes'

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'))

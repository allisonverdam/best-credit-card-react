import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Login from './auth/login'
import Cartoes from './cartoes/cartoes'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/login' component={Login} />
                    <Route path='/cartoes' component={Cartoes} />
                </Switch>
            </main>
        );
    }
}

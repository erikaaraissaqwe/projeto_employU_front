import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import SingIn from './pages/SignIn';
import SingUp from './pages/SingUp';
import NotFound from './pages/NotFound';

const Routes = () => {
    return (
        <Switch>
            <Route exact path = "/">
                <Home/>
            </Route>
            <Route exact path = "/sobre">
                <About/>
            </Route>
            <Route exact path = "/login">
                <SingIn/>
            </Route>
            <Route exact path = "/cadastro">
                <SingUp/>
            </Route>
            <Route >
                <NotFound/>
            </Route>

        </Switch>
    );
}

export default Routes;
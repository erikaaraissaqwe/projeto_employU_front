import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import SignInCandidate from './pages/SignInCandidate';
import SingUpCandidate from './pages/SingUpCandidate';
import NotFound from './pages/NotFound';
import InitialCandidate from './pages/InitialCandidate';
import PrivateRoute from './components/PrivateRoute';

const Routes = () => {
    return (
        <BrowserRouter>

            <Switch>

                <Route exact path = "/">
                    <Home/>
                </Route>

                <Route exact path = "/sobre">
                    <About/>
                </Route>

                <Route exact path = "/candidato/login">
                    <SignInCandidate/>
                </Route>

                <Route exact path = "/candidato/cadastro">
                    <SingUpCandidate/>
                </Route>

                <PrivateRoute exact path = "/candidato/inicio">
                    <InitialCandidate/>
                </PrivateRoute>

                <Route >
                    <NotFound/>
                </Route>

            </Switch>

        </BrowserRouter>
    );
}

export default Routes;
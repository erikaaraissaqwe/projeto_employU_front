import React from 'react';

import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import SignInCandidate from './pages/SignInCandidate';
import SingUpCandidate from './pages/SingUpCandidate';
import SignInCompany from './pages/SignInCompany';
import SingUpCompany from './pages/SingUpCompany';
import NotFound from './pages/NotFound';
import InitialCandidate from './pages/InitialCandidate';
import InitialCompany from './pages/InitialCompany';
import PrivateRouteCandidate from './components/PrivateRouteCandidate';
import PrivateRouteCompany from './components/PrivateRouteCompany'

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

                <PrivateRouteCandidate exact path = "/candidato/inicio">
                    <InitialCandidate/>
                </PrivateRouteCandidate>

                <Route exact path = "/empresa/login">
                    <SignInCompany/>
                </Route>

                <Route exact path = "/empresa/cadastro">
                    <SingUpCompany/>
                </Route>

                <PrivateRouteCompany exact path = "/empresa/inicio">
                    <InitialCompany/>
                </PrivateRouteCompany>

                

                <Route>
                    <NotFound/>
                </Route>

            </Switch>

        </BrowserRouter>
    );
}

export default Routes;
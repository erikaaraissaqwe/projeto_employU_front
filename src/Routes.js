import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import SignInCandidate from './pages/SignInCandidate';
import SingUpCandidate from './pages/SingUpCandidate';
import SignInCompany from './pages/SignInCompany';
import SingUpCompany from './pages/SingUpCompany';
import NotFound from './pages/NotFound';
import InitialCandidate from './pages/InitialCandidate';
import ResumeCandidate from './pages/ResumeCandidate';
import InitialCompany from './pages/InitialCompany';
import PrivateRouteCandidate from './components/PrivateRouteCandidate';
import PrivateRouteCompany from './components/PrivateRouteCompany';
import CandidateJobDetails from './pages/CadidateJobDetails';
import NewJobOffer from './pages/NewJobOffer';
import CompanyJobDetails from './pages/CompanyJobDetails';

const Routes = () => {
    
    return (
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
                <InitialCandidate userApplied={false}/>
            </PrivateRouteCandidate>

            <PrivateRouteCandidate exact path = "/candidato/concorrentes">
                <InitialCandidate userApplied={true}/>
            </PrivateRouteCandidate>

            <PrivateRouteCandidate exact path = "/candidato/curriculo">
                <ResumeCandidate/>
            </PrivateRouteCandidate>

            <PrivateRouteCandidate path = "/candidato/:jobId">
                <CandidateJobDetails/>
            </PrivateRouteCandidate>
            

            <Route exact path = "/empresa/cadastro">
                <SingUpCompany/>
            </Route>

            <Route exact path = "/empresa/login">
                <SignInCompany/>
            </Route>

            <PrivateRouteCompany exact path = "/empresa/inicio">
                <InitialCompany closed={false}/>
            </PrivateRouteCompany>

            <PrivateRouteCompany exact path = "/empresa/fechadas">
                <InitialCompany closed={true}/>
            </PrivateRouteCompany>

            <PrivateRouteCompany exact path = "/empresa/nova">
                <NewJobOffer/>
            </PrivateRouteCompany>

            <PrivateRouteCompany path = "/empresa/:jobId">
                <CompanyJobDetails/>
            </PrivateRouteCompany>

            <Route>
                <NotFound/>
            </Route>

        </Switch>
    );
}

export default Routes;
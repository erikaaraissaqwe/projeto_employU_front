import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { Link, useHistory } from 'react-router-dom';


import './style.css';

const Home = () => {

    const history = useHistory();
    
    const tipo = useSelector(state => state.user.tipo ? state.user.tipo : "");

    const isLogged = useSelector(state => state.user.isLogged);

    function handleCandidate(){
        history.push("/candidato/login");
    }

    function handleCompany(){
        history.push("/empresa/login");
    }

    function check(){
        if(isLogged){
            if (tipo === "Candidate") {
                history.push("/candidato/inicio");
            }
            if (tipo === "Company") {
                history.push("/empresa/inicio");
            }

            return true;
        }

        return false;
    }

    let checked = check();

    return (
        {checked} ? <Layout>
            <div className= "home">
                <h1>Home</h1>
            </div>

            <button onClick = { handleCandidate }>Candidato</button>
            <button onClick = { handleCompany }>Empresa</button>

            <Link to="/sobre">Sobre</Link>
            
        </Layout>
        :<></>
    );
}


export default Home;
    
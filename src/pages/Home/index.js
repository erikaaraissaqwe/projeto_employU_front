import React from 'react';
import { Layout } from 'antd';
import { Link, useHistory } from 'react-router-dom';


import './style.css';

const Home = () => {
    const history = useHistory();
    
    function handleCandidate(){
        history.push("/candidato/login");
    }

    function handleCompany(){
        history.push("/empresa/login");
    }

    return (
        <Layout>
            <div className= "home">
                <h1>Home</h1>
            </div>

            <button onClick = { handleCandidate }>Candidato</button>
            <button onClick = { handleCompany }>Empresa</button>

            <Link to="/sobre">Sobre</Link>
            
        </Layout>
    );
}


export default Home;
    
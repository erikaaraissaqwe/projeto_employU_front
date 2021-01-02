import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import './style.css';


const Home = () => {
    return (
        <Layout>
            <div className= "home">
                Home
            </div>
            <Link to="/sobre">Sobre</Link>
        </Layout>
    );
}


export default Home;
    
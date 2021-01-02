import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import './style.css';
import Nav from '../../components/Nav';

const About = () => {
    return (
        <Layout >

            <Nav/>

            <h1>Sobre</h1>

            <Link to="/">Inicio</Link>

        </Layout>
    );
}


export default About;
    
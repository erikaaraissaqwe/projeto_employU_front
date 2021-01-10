import React from 'react';
import { Card, Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';


import './style.css';

const NotFound = () => {

    return (
        <Layout>
            <Row type="flex" justify="center" align="middle" style={{minHeight: '90vh'}}>
                <Col className= "about">
                    <Card>
                        <h1>Essa página não existe :(</h1>
                    
                        <Link to="/">Voltar para a página inicial</Link>
                    </Card> 
                </Col>
            </Row>
        </Layout>
        
    );
}



export default NotFound;
    
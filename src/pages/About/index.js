import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Layout, Row } from 'antd';
import { Link, useHistory } from 'react-router-dom';


import './style.css';

const About = () => {

    const history = useHistory();
    
    const tipo = useSelector(state => state.user.tipo ? state.user.tipo : "");

    const isLogged = useSelector(state => state.user.isLogged);

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
            <Row type="flex" justify="center" align="middle" style={{minHeight: '90vh'}}>
                <Col className= "about">
                    <Card>
                        <h1>Seja bem vindo ao Employ U!</h1>
                        <h3>AQUI SERIA O TEXTO DO MOODLE
                            DHHDHDHHDFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDDDDDDDDDDDDD
                            JSBHHDHHHHHHHHHHHHHHFFFFFFFFFFFFFFDDDDDDDDDDDDDDDDDDDDDDDDDD
                            JJJJJJJJJJFFFFFFFFFFFFFFFFFFFFFFFFFFFFDDDDDDDDDDDDDDDDDDDDDD
                            FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFJJJJJJJJJJJJJJJJJJJJJJJDDDDDD
                            NJHGSHBDJKKKKKKKKKKCDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
                            :FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFDDDDDDDDDDDDDDDDDDDDDDDDDDD
                            </h3>
                    
                        <Link to="/">Voltar para a página inicial</Link>
                    </Card> 
                </Col>
            </Row>
        </Layout>
        :<></>
    );
}

    

export default About;
    
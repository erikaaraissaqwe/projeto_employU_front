import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Col, Layout, Row } from 'antd';
import { UserOutlined, ShopOutlined } from '@ant-design/icons';
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
            <Row type="flex" justify="center" align="middle" style={{minHeight: '89vh'}}>
                <Col className= "home">
                    <Card>
                        <hr/>
                        <h1>Seja bem vindo!</h1>
                        <hr/>
                        <br/>
                        <h3 className= "h3">Entrar como:</h3>
                        <Button type="primary" block size="large" shape="round" icon={<UserOutlined />}
                            onClick = { handleCandidate }>Candidato</Button>
                        <Button type="primary" block size="large" shape="round" icon={<ShopOutlined />}
                            onClick = { handleCompany }>Empresa</Button>
                        <br/>
                        <br/>
                        <Link to="/sobre">Sobre</Link>
                    </Card>
                </Col>
            </Row>
        </Layout>
        :<></>
    );
}


export default Home;
    
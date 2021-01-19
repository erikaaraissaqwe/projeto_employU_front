import React, {useState} from 'react';
import { Layout, Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import './style.css';

const { Content } = Layout;

const InitialCompany = () => {

    const [ email ] = useState(useSelector(state=>state.user.email));
    const [ id ] = useState(useSelector(state=>state.user.id));

    function testeParaVerDadosSalvos(){
        console.log("Email " + email);
        console.log("Id " + id);

    }

    function logout(){
        localStorage.clear();
        window.location.reload();
    }
    
    return (
        <Content >
            <Row>
                <Col span={24} >
                   <h1> pagina inicial da empresa</h1>
                </Col>
                <br/>
                <Col span={36} >
                    <button onClick = { testeParaVerDadosSalvos }>Clique aqui no CONSOLE</button>
                </Col>
                <br/>
                <Col span={50} >
                    <button onClick = { logout }>Sair (Deslogar)</button>
                </Col>
            </Row>
        </Content>
    );
}


export default InitialCompany;
    
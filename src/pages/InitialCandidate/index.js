import React, {useState} from 'react';
import { Layout, Col, Row } from 'antd';
import { useSelector } from 'react-redux';

import './style.css';

const { Content } = Layout;

const InitialCandidate = () => {

    const [ email, setEmail ] = useState(useSelector(state=>state.user.email));
    const [ id, setId ] = useState(useSelector(state=>state.user.id));

    function testeParaVerDadosSalvos(){
        console.log("Email " + email);
        console.log("Id " + id);

    }
    
    return (
        <Content >
            <Row>
                <Col span={24} >
                   <h1> pagina inicial do candidato</h1>
                </Col>
                <br/>
                <Col span={36} >
                    <button onClick = { testeParaVerDadosSalvos }>Clique aqui no CONSOLE</button>
                </Col>
                <br/>
            </Row>
        </Content>
    );
}


export default InitialCandidate;
    
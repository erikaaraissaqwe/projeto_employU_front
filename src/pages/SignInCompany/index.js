import React, { useState } from 'react';
import { Layout, Col, Row } from 'antd';

import './style.css';
import api from '../../services/Api';

const { Content } = Layout;

const SignInComponent = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(){
        let response = await api.post("/candidato/login", {
            email, password
        });
        
    }

    return (
        <Content className= "login">
            <Row>
                <Col span={12} className= "columnLogin">
                   <input type="text" onChange = {event => setEmail(event.target.value)}/>
                </Col>
                <Col span={24} className= "columnSenha">
                   <input type="text" onChange = {event => setPassword(event.target.value)}/>
                </Col>
                <button type="submit" onClick = {handleSubmit()}>Teste</button>
            </Row>
        </Content>
    );
}


export default SignInComponent;
    
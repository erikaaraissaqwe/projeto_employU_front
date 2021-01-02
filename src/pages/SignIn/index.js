import React from 'react';
import { Layout, Col, Row } from 'antd';

import './style.css';

const { Content } = Layout;

const SignInComponent = () => {
    return (
        <Content className= "login">
            <Row>
                <Col span={24} className= "columnLogin">
                    Isso vai ser o login
                </Col>
            </Row>
        </Content>
    );
}


export default SignInComponent;
    
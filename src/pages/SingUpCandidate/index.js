import React from 'react';
import { Layout, Col, Row } from 'antd';

import './style.css';

const { Content } = Layout;

const SignUnComponent = () => {
    return (
        <Content className= "register">
            <Row>
                <Col span={24} className= "columnRegister">
                    Isso vai ser o cadastro
                </Col>
            </Row>
        </Content>
    );
}


export default SignUnComponent;
    
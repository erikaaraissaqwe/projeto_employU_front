import React from 'react';
import { Layout, Col, Row } from 'antd';

import './style.css';

const { Content } = Layout;

const NotFound = () => {
    return (
        <Content className= "notFound">
            <Row>
                <Col span={24} className= "columnNotFound">
                    Não Encontrado
                </Col>
            </Row>
        </Content>
    );
}


export default NotFound;
    
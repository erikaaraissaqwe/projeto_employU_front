import React from 'react';
import { Layout, Col, Row } from 'antd';

import './style.css';

const { Footer } = Layout;

const FooterComponent = () => {
    return (
        <Footer className= "footer">
            <Row>
                <Col span={24} className= "columnFooter">
                    Copyright @2020 EmployU
                </Col>
            </Row>
        </Footer>
    );
}


export default FooterComponent;
    
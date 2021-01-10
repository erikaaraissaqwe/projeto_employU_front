import React from 'react';
import { Col, Row, Card} from 'antd';

//import './style.css';

const JobCardsComponent = ({ jobs }) => {
    console.log(jobs)
    return (
        <Row gutter={16} style={{padding: '0 2%'}}>
            {jobs.map((job, i) => (
                <Col key={i} span={8} style={{marginTop: '1%'}}>
                    <Card title="Card title">
                        {job.description}
                    </Card>
                </Col>
            ))}
        </Row>
    );
}


export default JobCardsComponent;
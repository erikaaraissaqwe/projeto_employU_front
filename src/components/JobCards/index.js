import React from 'react';
import { Button, Col, Row, Card} from 'antd';

import './style.css';

function handleJob(){
    this.props.history.push("/candidato/vaga");
}
const JobCardsComponent = ({ jobs }) => {
    
    //console.log("jobs:",jobs)
    return (
        <Row gutter={16} style={{padding: '0 2%'}}>
            {jobs.map((job, i) => (
                <Col key={i} span={8} style={{marginTop: '1%'}}>
                    <Card title={job.company.name}>
                        <h3>Descrição:</h3>
                        {job.description}
                        <Button type="primary" block size="medium" shape="round" onClick = {handleJob}
                            >Vizualizar Vaga</Button>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}


export default JobCardsComponent;
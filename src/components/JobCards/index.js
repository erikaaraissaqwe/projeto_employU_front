import { Button, Col, Row, Card} from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './style.css';


const JobCardsComponent = ({ jobs }) => {
    const [ tipo ] = useState(useSelector(state=>state.user.tipo));
    const history = useHistory();
    
    const handler = function(id){
        history.push(`${id}`)
    }

    const headBg = (isOpen) => {
        return({
            backgroundColor: isOpen? "#d8e8f2" : "#d9d9d9"
        });
    }

    return (jobs?
        <Row gutter={16} style={{padding: '0 2%'}}>
            {jobs.map((job) => (
                <Col key={job._id} span={8} style={{marginTop: '1%'}} onClick={ () => handler(job._id)}>
                    <Card hoverable title={job.company.name} headStyle={headBg(job.isOpen)}>
                        <h3>Descrição:</h3>
                        {job.description}
                    </Card>
                </Col>
            ))}
        </Row>:
        <></>
    );
}


export default JobCardsComponent;
import React from 'react';
import { Card, Button} from 'antd';

import './style.css';

const JobDetails = ( {job, userType}) => {
    const jb = job.job
    const extraActions = (isOpen, userApplied) => {
        return(
            isOpen?
                userType==="candidato"?
                    userApplied?
                        <Button type="primary">Desistir</Button>:
                        <Button type="primary">Candidatar-se</Button>
                    :<Button type="primary">Fechar vaga</Button>
            :<></>
        )
    }
    const headBg = (isOpen) => {
        return({
            backgroundColor: isOpen? "#d8e8f2" : "#d9d9d9"
        });
    }

    return (jb?
            <Card title={jb.company.name} extra={extraActions(jb.isOpen, jb.isRunning)} headStyle={headBg(jb.isOpen)}>
                <h3>Descrição:</h3>
                <p>{jb.description}</p>
                <h3>Localização:</h3>
                <p>{jb.address.street}, {jb.address.number} - {jb.address.city}, {jb.address.state}</p>
                {jb.qualifications.length > 0 && <h3>Diferenciais:</h3> }
                    <ul>
                        {jb.qualifications.map((qInfo, q) => {
                        return <li key={q}>{qInfo}</li>  
                        })}
                    </ul>
                {jb.requirements.length > 0 && <h3>Requisitos:</h3> }
                <ul>
                    {jb.requirements.map((rInfo, r) => {
                        return <li key={r}>{rInfo}</li>  
                    })}
                </ul>
                <h4>Informações adicionais:</h4>
                <p>{jb.additionalInformation}</p>
            </Card>:
            <></>
    );
}


export default JobDetails;
    
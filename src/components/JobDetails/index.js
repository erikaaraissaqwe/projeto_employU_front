import React, {useState} from 'react';
import { Card, Button} from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import api from '../../services/Api';
import './style.css';

const JobDetails = ( {job, userType}) => {
    const jb = job.job
    const [ authorization ] = useState(useSelector(state=>state.user.token));
    const [ user_id ] = useState(useSelector(state=>state.user.id));
    const { jobId } = useParams();

    async function handleClick(candInJob){
        try{
            if(candInJob){
                await api.post(`/candidato/vagas/${jobId}/candidatar`, {headers: {authorization, user_id}});
            }else{
                await api.post(`/candidato/vagas/${jobId}/desistir`, {headers: {authorization, user_id}});
            }
        }catch(error){
            console.clear();
            console.log(error.response.data.errorMessage)
        }
    }

    const extraActions = (isOpen, userApplied) => {
        return(
            isOpen?
                userType==="candidato"?
                    userApplied?
                        <Button type="primary" onClick={() => handleClick(false)}>Desistir</Button>:
                        <Button type="primary" onClick={() => handleClick(true)}>Candidatar-se</Button>
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
    
import React, {useEffect, useState} from 'react';
import { Layout, Col, Row} from 'antd';
import { useSelector } from 'react-redux';
import api from '../../services/Api';
import JobCards from '../../components/JobCards';

import './style.css';

const { Content } = Layout;

const InitialCandidate = ({userApplied}) => {
    const [ authorization ] = useState(useSelector(state=>state.user.token));
    const [ user_id ] = useState(useSelector(state=>state.user.id));
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobs(){
            let response;
            try{
                if (userApplied) {
                    response = await api.get("/candidato/vagas/candidatadas", {headers: {authorization, user_id}});
                }
                else {
                    response = await api.get("/candidato/vagas", {headers: {authorization, user_id}});
                }
                setJobs(await response.data.jobs)
    
            }catch(error){
                //console.clear();
                if(error.response.data.errorMessage === "Nenhuma vaga em aberto"){
                    alert("Nenhuma vaga encontrada");
                }
            }
        }
        getJobs();
    }, [authorization, userApplied, user_id]);
    
    return (
        <Content type="flex" style={{minHeight: '89vh', padding: '6% 3% 0 3%'}}>
            <Row>
                <Col>
                   <h1>Vagas disponíveis</h1>
                </Col>
            </Row>
            <JobCards jobs={jobs} />
        </Content>
    );
}


export default InitialCandidate;
    
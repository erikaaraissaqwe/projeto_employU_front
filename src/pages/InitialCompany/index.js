import React, {useEffect, useState} from 'react';
import { Layout, Col, Row } from 'antd';
import api from '../../services/Api';
import { useSelector } from 'react-redux';
import JobCards from '../../components/JobCards';

import './style.css';

const { Content } = Layout;

const InitialCompany = ({closed}) => {
    const [ authorization ] = useState(useSelector(state=>state.user.token));
    const [ user_id ] = useState(useSelector(state=>state.user.id));
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobs(){
            let response;
            try{
                if (!closed) {
                    response = await api.get("/empresa/vagas", {headers: {authorization, user_id}});
                }
                else {
                    response = await api.get("/empresa/vagas/fechadas", {headers: {authorization, user_id}});
                }
                setJobs(await response.data.jobs);
            }catch(error){
                //console.clear();
                console.log("Nenhuma vaga encontrada");
            }
        }
        getJobs();
    }, [authorization, closed, user_id]);
    
    return (
        <Content type="flex" style={{minHeight: '89vh', padding: '6% 3% 0 3%'}}>
            <Row>
                <Col>
                   {closed?<h1>Vagas fechadas</h1>:<h1>Vagas abertas</h1>}
                </Col>
            </Row>
            <JobCards jobs={jobs} />
        </Content>
    );
}


export default InitialCompany;
    
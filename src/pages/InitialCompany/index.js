import React, {useEffect, useState} from 'react';
import { Layout, Col, Row } from 'antd';
import api from '../../services/Api';
import { useSelector } from 'react-redux';
import JobCards from '../../components/JobCards';

import './style.css';

const { Content } = Layout;

const InitialCompany = () => {
    const [ authorization ] = useState(useSelector(state=>state.user.token));
    const [ user_id ] = useState(useSelector(state=>state.user.id));
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function getJobs(){
            let response;
            try{
                response = await api.get("/empresa/vagas", {headers: {authorization, user_id}});
                setJobs(await response.data.jobs)
            }catch(error){
                //console.clear();
                if(error.response.data.errorMessage === "Nenhuma vaga em aberto"){
                    alert("Nenhuma vaga encontrada");
                }
            }
        }
        getJobs();
    }, [authorization, user_id]);
    
    return (
        <Content type="flex" style={{minHeight: '89vh', padding: '6% 3% 0 3%'}}>
            <Row>
                <Col>
                   <h1>Vagas abertas</h1>
                </Col>
            </Row>
            <JobCards jobs={jobs} />
        </Content>
    );
}


export default InitialCompany;
    
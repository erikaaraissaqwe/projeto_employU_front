import React, { useEffect, useState } from 'react';
import api from '../../services/Api';
import { Layout} from 'antd';

import './style.css';
import JobDetails from '../../components/JobDetails';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

const { Content } = Layout;

const CandidateJobDetails = (applied) => {
    const [ authorization ] = useState(useSelector(state=>state.user.token));
    const [ user_id ] = useState(useSelector(state=>state.user.id));
    const [job, setJob] = useState([]);
    const { jobId } = useParams();

    useEffect(() => {
        async function getJob(){
            let response;
            try{
                response = await api.get(`/candidato/vagas/${jobId}`, {headers: {authorization, user_id}});
    
                setJob(await response.data)
    
            }catch(error){
                //console.clear();

                if(error.response.data.errorMessage === "Nenhuma vaga encontrada"){
                    alert("Nenhuma vaga encontrada");
                }
            }
        }
        getJob();
    }, [authorization, jobId, user_id]);
    
    return (
        <Content type="flex" style={{minHeight: '89vh', padding: '85px 15% 3% 15%'}}>
            <JobDetails job={job} userType={"candidato"} />
        </Content>
    );
}


export default CandidateJobDetails;
    
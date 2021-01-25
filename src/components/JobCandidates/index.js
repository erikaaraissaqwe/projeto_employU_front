import { Table, Card} from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/Api';


const JobCandidates = (vagaId) => {
    const [ authorization ] = useState(useSelector(state=>state.user.token));
    const [ user_id ] = useState(useSelector(state=>state.user.id));
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        async function getCandidate(){
            let response;
            try{
                response = await api.get(`/empresa/vagas/${vagaId.vagaId}/candidatos`, {headers: {authorization, user_id}});
                setCandidates(await response.data.candidates)
            }catch(error){
                //console.clear();
                console.log(error);
            }
        }
        getCandidate();
    }, [authorization, user_id, vagaId]);

    const dataKey = () => {
        return candidates.map((cd, i) => {
            cd.key = i
            return cd;
        });
    }

    const renderResume = (resume) => {
        if (resume) {
            return(
                <>
                    {resume.address &&
                    <>
                        <h3>Endereço:</h3>
                        <p>{resume.address}</p>
                    </>}

                    {resume.professionalExperience.length > 0 &&
                    <>
                        <h3>Experiência profissional:</h3>
                        <ul>
                            {resume.professionalExperience.map((pInfo, p) => {
                                return <li key={p}>{pInfo}</li>  
                            })}
                        </ul>
                    </>}

                    {resume.academicFormation.length > 0 &&
                    <>
                        <h3>Formação acadêmica:</h3>
                        <ul>
                            {resume.academicFormation.map((aInfo, a) => {
                                return <li key={a}>{aInfo}</li>  
                            })}
                        </ul>
                    </>}
                </>
            );
        }
    }

    return (candidates.length > 0?
            <Card
                title="Candidatos"
                type="inner"
            >
            <Table 
                columns={[
                    {
                        title: 'Nome',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: "Email",
                        dataIndex: 'email',
                        key: 'email'
                    },
                ]}
                expandable={{
                    expandedRowRender: record => 
                    <>
                        {renderResume(record.resume)}
                        {
                            record.candidateFeedback &&
                            <Card
                                title="Feedback"
                                type="inner"
                            >
                                {record.candidateFeedback}
                            </Card>
                        }
                    </>
                }}
                dataSource={dataKey()}
                size="small"
            />
            </Card>:
            <></>
    );
}


export default JobCandidates;
                        
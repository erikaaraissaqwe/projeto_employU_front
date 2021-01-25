import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/Api';
import { Card, Button, Modal, Input, Form} from 'antd';
import { useHistory } from 'react-router';
import JobCandidates from '../JobCandidates';
import './style.css';

const JobDetails = ( {job, userType}) => {
    const jb = job.job
    const [ authorization ] = useState(useSelector(state=>state.user.token));
    const [ user_id ] = useState(useSelector(state=>state.user.id));
    const history = useHistory();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    async function handleClick(candInJob){
        try{
            if(candInJob){
                let response = await api.post(`/candidato/vagas/${jb._id}/candidatar`,{}, {headers: {authorization, user_id}});
                console.log(response);
                history.push("/candidato/inicio");
            }else{
                await api.put(`/candidato/vagas/${jb._id}/desistir`,{}, {headers: {authorization, user_id}});
                this.showModal();
                history.push("/candidato/inicio");
            }
        }catch(error){
            console.log(error.response.data.errorMessage)
        }
    }

    const extraActions = (isOpen, userApplied, feedback) => {
        if (userType==="candidato"){
            return(
                isOpen?
                    userApplied?
                        <Button type="primary" onClick={ () => handleClick(false) }>Desistir</Button>:
                        <Button type="primary" onClick={ () => handleClick(true) }>Candidatar-se</Button>
                    :userApplied?
                        feedback?
                            <></>:
                            <Button type="primary" onClick={ showModal }>Feedback</Button>
                        :<></>
            );
        }
        else {
            return (
                isOpen?
                    <Button type="primary" onClick={ showModal }>Fechar vaga</Button>:
                    <></>
            );
        }
    }

    const setFeedbackModal = (isOpen, userApplied) => {
        if (userType==="candidato"){
            return (
                userApplied?
                    isOpen?
                        modalRender({title: "Envie um feedback para a empresa", onOk:dropApplication}):
                        modalRender({title: "Envie um feedback para a empresa", onOk:form.submit})
                    :<></>
            );
        }
        else {
            return (
                isOpen?
                    modalRender({title: "Envie um feedback para os candidatos", onOk:closeJob}):
                    <></>
            );
        }
    }
    const { TextArea } = Input;
    const modalRender = (args) => {
        return (
            <Modal {...args} visible={isModalVisible} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="feedback"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item name="msg">
                        <TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
    
    
    

    const onFinish = (values) => {
        handleSubmitFeedback(values);
        setIsModalVisible(false);
    }

    async function handleSubmitFeedback(values){
        try{
            await api.put(`/${userType}/vagas/${jb._id}/feedback`, values, {headers: {authorization, user_id}});
        }catch(error){
            console.clear();
            console.log(error.response.data.errorMessage)
        }
    }

    const dropApplication = () => {
        form.submit();
        //todo desistir
        history.push('inicio');
    };

    const closeJob = () => {
        form.submit();
        //todo fechar vaga
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    }

    const headBg = (isOpen) => {
        return({
            backgroundColor: isOpen? "#d8e8f2" : "#d9d9d9"
        });
    }

    return (jb?
            <>
                <Card title={jb.company.name} extra={extraActions(jb.isOpen, jb.isRunning, jb.candidateFeedback)} headStyle={headBg(jb.isOpen)}>
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
                    {
                        jb.candidateFeedback &&
                        <Card
                            title="Seu feedback"
                            type="inner"
                        >
                            {jb.candidateFeedback}
                        </Card>
                    }
                    <br />
                    {
                        jb.companyFeedback &&
                        <Card
                            title="Feedback da empresa"
                            type="inner"
                        >
                            {jb.companyFeedback}
                        </Card>
                    }
                    <br />
                    {
                        userType === 'empresa'?
                        <JobCandidates vagaId={jb._id}/>:<></>
                    }
                </Card>
                { setFeedbackModal(jb.isOpen, jb.isRunning) }
             </>:
            <></>
    );
}


export default JobDetails;
    
/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import {  useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/Api';

const ResumeComponent = () => {

    const history = useHistory();

    const [address, setAddress] = useState("");

    const [professionalExperiences, setProfessionalExperiences] = useState([]);

    const [academicFormations, setAcademicFormations] = useState([]);

    const [ authorization ] = useState(useSelector(state=>state.user.token));
    
    const [ user_id ] = useState(useSelector(state=>state.user.id));

    const name = useSelector(state => state.user.name);

    const cpf = useSelector(state => state.user.cpf);

    const email = useSelector(state => state.user.email);

    const [listProfessionalExperiences, setListProfessionalExperiences] = useState([]);

    async function handleSubmit(){
        let response;
        try{
            response = await api.post("/candidato/curriculo/send", {
                address, 
                academicFormations, 
                professionalExperiences},
                {headers: {
                    authorization, 
                    user_id
                },
            });

            console.log(response.data);
            history.push("/candidato/inicio");

        }catch(error){
            console.clear();
            if(error.response.data.errorMessage === "User not found"){
                alert("Usuário não existe");
                history.push("/candidato/login");
            }
            else if(error.response.data.errorMessage === "Resume Registration failed"){
                alert("Desculpe, aconteceu algum erro na hora do cadastro do currículo :( Tente novamente!");
            }
            else if(error.response.data.errorMessage === "There are empty fields"){
                alert("Desculpe, há campos vazios");
            }
            else{
                history.push("/");
            }
        }
    }

    function updateExperiences(params, index) {
        let splitList = professionalExperiences.split(",");
        if(splitList.length === index){
            setProfessionalExperiences(professionalExperiences + ',' + params);
            return true;
        }
        splitList[index] = params;
        setProfessionalExperiences(splitList.toString());
        console.log(professionalExperiences);

        return true;
    }
    
    function updateAcademic(params, index) {
        let splitList = professionalExperiences.split(",");
        if(splitList.length === index){
            setAcademicFormations(professionalExperiences + ',' + params);
            return true;
        }
        splitList[index] = params;
        setAcademicFormations(splitList.toString());
        console.log(professionalExperiences);
        return true;
    }

    function moreList(){
        setProfessionalExperiences([...this.professionalExperiences, '']);
    }

    function lessList(index){
        let splitList = professionalExperiences.split(",");
        splitList.remove(index);
        setAcademicFormations(splitList.toString());
        console.log(professionalExperiences);
        return true;
    }

    const layout = {
        labelCol: { span: 18 },
        wrapperCol: { span: 48 },
    };
      
    const tailLayout = {
        wrapperCol: { offset: 0, span: 48 },
    };
      
    const onFinish = (values) => {
        console.log('Success');
    };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        required: '${label} é um campo necessário!',
    };

    return (
        <Layout className= "curriculo">
            <Row type="flex" justify="center" align="middle" style={{minHeight: '150vh'}}>
                <Col span={18} className= "curriculoForm">
                    <Card>
                        <Form {...layout}
                            name="basic"
                            layout="vertical"
                            validateMessages={validateMessages}
                            className="FormCurriculo"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <h2>Currículo</h2>
                            <Form.Item
                                label="Nome"
                                name="nome"
                            >
                                <Input value={name} disabled={true}/>
                            </Form.Item>
                            <Form.Item
                                label="CPF"
                                name="cpf"
                            >
                                <Input value={cpf} disabled={true} />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                            >
                                <Input values={email} disabled={true}/>
                            </Form.Item>
                            <Form.Item
                                label="Endereço"
                                name="endereço"
                                rules={[{ required: true }]}
                            >
                                <Input onChange = { event => setAddress(event.target.value) }/>
                            </Form.Item>
                            <Form.Item
                                label="Experiência Professional"
                                name="professionalExperiences"
                                rules={[{ required: true }]}
                            >
                                <>
                                    <Input key={0} style={{width: 900}}  onChange = { event => updateExperiences(event.target.value, 0) }/>
                                    <Button type="primary"  onClick={moreList}>Mais</Button>
                                </>

                                {professionalExperiences.map((exp, index) => {
                                    return(
                                        <>
                                            <Input key={index+1} style={{width: 800}}  onChange = { event => updateExperiences(event.target.value, index+1) }/>
                                            <Button type="second" onClick={lessList}>Excluir</Button>
                                        </>
                                    );
                                    })}
                            </Form.Item>
                            
                            <Form.Item
                                label="Formação Acadêmica"
                                name="academicFormation"
                                rules={[{ required: true}]}
                            >
                                <Input onChange = { event => setAcademicFormations(event.target.value) }/>
                            </Form.Item>
                        
                            <Form.Item {...tailLayout}>
                                <Button block type="primary" htmlType="submit" onClick = { handleSubmit }>
                                    Cadastrar
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Layout>
        
    );
}


export default ResumeComponent;
    
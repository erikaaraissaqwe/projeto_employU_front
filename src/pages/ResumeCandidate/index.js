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

    const [professionalExperience, setProfessionalExperiences] = useState([]);

    const [academicFormation, setAcademicFormations] = useState([]);

    const [ authorization ] = useState(useSelector(state=>state.user.token));
    
    const [ user_id ] = useState(useSelector(state=>state.user.id));

    const name = useSelector(state => state.user.name);

    const cpf = useSelector(state => state.user.cpf);

    const email = useSelector(state => state.user.email);

    async function handleSubmit(){
        let response;
        let professionalExperiences = professionalExperience.toString() ? professionalExperience.toString() : "Não tem experiência";
        let academicFormations = academicFormation.toString() ? academicFormation.toString() : "Não tem formação";
        console.log(professionalExperiences)
        console.log(academicFormations)
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
        let lista = professionalExperience;
        lista[index] = params;
        setProfessionalExperiences(lista);
        return true;
    }
    
    function updateAcademic(params, index) {
        let lista = academicFormation;
        lista[index] = params;
        setAcademicFormations(lista);
        return true;
    }

    function moreList(){
        setProfessionalExperiences([...professionalExperience, '']);
        
    }

    function lessList(index){
        setProfessionalExperiences(professionalExperience.splice(index, 1));
    }

    function moreListAcademic(){
        setAcademicFormations([...academicFormation, '']);
        
    }

    function lessListAcademic(index){
        setAcademicFormations(academicFormation.splice(index, 1));
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
                                initialValue={name}
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item
                                label="CPF"
                                name="cpf"
                                initialValue={cpf}
                            >
                                <Input value={cpf} disabled={true} />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                initialValue={email}
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item
                                label="Endereço"
                                name="endereço"
                                rules={[{ required: true }]}
                            >
                                <Input onChange = { event => setAddress(event.target.value) }/>
                            </Form.Item>
                            <Form.Item
                                name="experiences"
                            >
                                <>
                                    <Button type="primary"  onClick={moreList}>Adicionar Experiência</Button>
                                </>
                                {professionalExperience.map((exp, index) => {
                                    return(
                                        <div key={index}>
                                            <Input  style={{width: 900}} onChange = { event => updateExperiences(event.target.value, index) }/>
                                            <Button type="second" onClick={function(){lessList(index)}}>Excluir</Button>
                                        </div>
                                    );
                                    })}
                            </Form.Item>
                            
                            <Form.Item
                                name="academicFormation"
                            >
                                 <>
                                    <Button type="primary"  onClick={moreListAcademic}>Adicionar Formação Acadêmica</Button>
                                </>
                                {academicFormation.map((exp, i) => {
                                    return(
                                        <div key={i}>
                                            <Input  style={{width: 900}} onChange = { event => updateAcademic(event.target.value, i) }/>
                                            <Button type="second" onClick={function(){lessListAcademic(i)}}>Excluir</Button>
                                        </div>
                                    );
                                    })}
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
    
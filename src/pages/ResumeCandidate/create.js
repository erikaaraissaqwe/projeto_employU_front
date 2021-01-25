/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import {  useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/Api';

const ResumeComponent = () => {

    const history = useHistory();

    const [ authorization ] = useState(useSelector(state=>state.user.token));
    
    const [ user_id ] = useState(useSelector(state=>state.user.id));

    const name = useSelector(state => state.user.name);

    const cpf = useSelector(state => state.user.cpf);

    const email = useSelector(state => state.user.email);

    async function handleSubmit(values){
        let response;
        let professionalExperiences = values.professionalExperience;
        let lenghtIsNull = !professionalExperiences ? true : professionalExperiences.length ;
        if(!professionalExperiences || !lenghtIsNull){
            professionalExperiences = "Não tem experiência";
        }else{
            professionalExperiences = professionalExperiences.toString()
        }
        let academicFormations = values.academicFormation;
        lenghtIsNull = !academicFormations ? true : academicFormations.length;
        if(!academicFormations || !lenghtIsNull){
            academicFormations = "Não tem formação";
        }else{
            academicFormations = academicFormations.toString()
        }
        let address = values.address;
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
            // console.clear();
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

    const layout = {
        labelCol: { span: 18 },
        wrapperCol: { span: 48 },
    };
      
    const tailLayout = {
        wrapperCol: { offset: 0, span: 48 },
    };
      
    const onFinish = (values) => {
        handleSubmit(values);
    };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        required: '${label} é um campo necessário!',
    };

    // const [form] = Form.useForm();

    return (
        <Layout className= "curriculo">
            <Row type="flex" justify="center" align="middle" style={{minHeight: '150vh'}}>
                <Col span={18} className= "curriculoForm">
                    <Card>
                        <Form {...layout}
                            name="basic"
                            layout="vertical"
                            validateMessages={validateMessages}
                            initialValues={{
                                // { remember: true }
                                name: name,
                                email: email,
                                cpf: cpf,
                        }}
                            className="FormCurriculo"
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <h2>Currículo</h2>
                            <Form.Item
                                label="Nome"
                                name="name"
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item
                                label="CPF"
                                name="cpf"
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                            >
                                <Input disabled={true}/>
                            </Form.Item>
                            <Form.Item
                                label="Endereço"
                                name="address"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Form.List name="professionalExperience">
                                        {(fields, { add, remove }, { errors }) => (
                                            <>
                                                {fields.map((field, index) => (
                                                <Form.Item
                                                    label={index === 0 ? 'Experiências' : ''}
                                                    required={true}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                            required: true,
                                                            whitespace: true,
                                                            message: "Por favor, insira alguma experiência.",
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input style={{ width: '80%'}} />
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                </Form.Item>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        onClick={() => add()}
                                                        style={{ width: '80%' }}
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Adicionar uma experiência
                                                    </Button>
                                                <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Col>
                                <Col span={12}>
                                    <Form.List name="academicFormation">
                                        {(fields, { add, remove }, { errors }) => (
                                            <>
                                                {fields.map((field, index) => (
                                                <Form.Item
                                                    label={index === 0 ? 'Formação' : ''}
                                                    required={true}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                        required: true,
                                                        whitespace: true,
                                                        message: "Por favor, insira alguma formação.",
                                                        },
                                                    ]}
                                                    noStyle
                                                    >
                                                        <Input 
                                                            style={{ width: '80%'}} />
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                </Form.Item>
                                                ))}
                                                <Form.Item>
                                                    <Button
                                                        onClick={() => add()}
                                                        style={{ width: '80%' }}
                                                        icon={<PlusOutlined />}
                                                    >
                                                        Adicionar uma formação
                                                    </Button>
                                                <Form.ErrorList errors={errors} />
                                                </Form.Item>
                                            </>
                                        )}
                                    </Form.List>
                                </Col>
                            </Row>
                            <Form.Item {...tailLayout}>
                                <Button block type="primary" htmlType="submit">
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
    
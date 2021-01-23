/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/Api';

const SingUpComponent = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [cpf, setCpf] = useState("");

    const [name, setName] = useState("");

    const tipo = useSelector(state => state.user.tipo ? state.user.tipo : "");

    const isLogged = useSelector(state => state.user.isLogged);

    async function handleSubmit(){
        let response;
        try{
            response = await api.post("/candidato/register", {
                email, password, name, cpf
            });

            var token = "Bearer " + response.data.token;
            var id = response.data.user._id;
    
            dispatch({
                type: "SET_TOKEN_CANDIDATE",
                payload: {
                    token,
                    isLogged : true,
                    name,
                    cpf,
                    id,
                    email,
                }
            });
            
            history.push("/candidato/curriculo");

        }catch(error){
            console.clear();
            if(error.response.data.errorMessage === "User already exists"){
                alert("Usuário já existe");
                history.push("/candidato/login");
            }
            else if(error.response.data.errorMessage === "Registration failed"){
                alert("Desculpe, aconteceu algum erro na hora do cadastro :( Tente novamente!");
            }
            else{
                history.push("/");
            }
        }
    }

    function check(){
        if(isLogged){
            if (tipo === "Candidate") {
                history.push("/candidato/inicio");
            }
            if (tipo === "Company") {
                history.push("/empresa/inicio");
            }

            return true;
        }

        return false;
    }

    let checked = check();

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
        types: {
          email: '${label} não é um email válido!',
        },
    };

    return (
        {checked} ?
        <Layout className= "cadastro">
            <Row type="flex" justify="center" align="middle" style={{minHeight: '110vh'}}>
                <Col span={12} className= "cadastroForm">
                    <Card>
                        <Form {...layout}
                            name="basic"
                            layout="vertical"
                            validateMessages={validateMessages}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <h2>Cadastre-se - Candidato</h2>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true }]}
                            >
                                <Input onChange = { event => setName(event.target.value) }/>
                            </Form.Item>
                            <Form.Item
                                label="Cpf"
                                name="cpf"
                                rules={[{ required: true }]}
                            >
                                <Input onChange = { event => setCpf(event.target.value) }/>
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, type: 'email' }]}
                            >
                                <Input onChange = { event => setEmail(event.target.value) }/>
                            </Form.Item>
                            <Form.Item
                                label="Senha"
                                name="password"
                                rules={[{ required: true }]}
                            >
                                <Input.Password onChange = { event => setPassword(event.target.value) } />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button block type="primary" htmlType="submit" onClick = { handleSubmit }>
                                    Cadastrar
                                </Button>
                            </Form.Item>
                        </Form>
                        <span>Já é cadastrado?</span>
                        <Link to="/candidato/login">Faça login!?</Link>
                    </Card>
                </Col>
            </Row>
        </Layout>
        : <></>
    );
}


export default SingUpComponent;
    
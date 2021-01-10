import React, { useState } from 'react';
import { Layout, Row, Col, Card, Form, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/Api';

//Nao sei se tem algum uso
//const { Content } = Layout;

const SignInComponent = () => {

    const dispatch = useDispatch();

    const history = useHistory();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const tipo = useSelector(state => state.user.tipo ? state.user.tipo : "");

    const isLogged = useSelector(state => state.user.isLogged);

    async function handleSubmit(){
        let response;
        try{
            response = await api.post("/candidato/loginCheck", {
                email, password
            });

            var token = "Bearer " + response.data.token;
            var name = response.data.user.name;
            var cpf = response.data.user.cpf;
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
            
            history.push("/candidato/inicio");

        }catch(error){
            console.clear();
            if(error.response.data.errorMessage === "User not found"){
                alert("user n encontrado bb");
            }
            else if(error.response.data.errorMessage === "Invalid password"){
                alert("senha incorreta");
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
        labelCol: { span: 8 },
        wrapperCol: { span: 24 },
    };
      
    const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
    };
      
    const onFinish = (values) => {
        console.log('Success:', values);
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
        <Layout className= "login">
            <Row type="flex" justify="center" align="middle" style={{minHeight: '90vh'}}>
                <Col span={6} className= "loginForm">
                    <Card>
                        <Form {...layout}
                            name="basic"
                            layout="vertical"
                            validateMessages={validateMessages}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <h2>Login como candidato</h2>
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
                                    Entrar
                                </Button>
                            </Form.Item>
                        </Form>
                        <span>Não possui conta?</span>
                        <Link to="/candidato/cadastro"> Cadastre-se</Link>
                    </Card>
                </Col>
            </Row>
        </Layout>
        : <></>
    );
}


export default SignInComponent;
    
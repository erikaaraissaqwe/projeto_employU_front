import React, { useState } from 'react';
import { Card, Button, Input, Layout, Form, Row, Col, InputNumber} from 'antd';
import api from '../../services/Api';
import './style.css';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

const { Content } = Layout;
const { TextArea } = Input;

const layoutFormat = {
    labelCol: { span: 8 },
    wrapperCol: { span: 24 },
};

const NewJobOffer = () => {
    const [ authorization ] = useState(useSelector(state=>state.user.token));
    const [ user_id ] = useState(useSelector(state=>state.user.id));
    const history = useHistory();

    async function handleSubmit(values){
        let response;
        try{
            response = await api.post("/empresa/vagas/add", {
                description: values.description,
                requirements: values.requirements || [],
                address: {
                    street: values.street,
                    number: values.number,
                    city: values.city,
                    state: values.state
                },
                qualifications: values.qualifications || [],
                additionalInformation: values.additionalInfo,
                companyId: user_id
            }, {headers: {authorization, user_id}});

            let result = await response.data
            if (result) {
                history.push('/empresa/inicio')
            }

        }catch(error){
            console.clear();
            console.log(error.response.data.errorMessage)
        }
    }

    const onFinish = (values) => {
        handleSubmit(values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const validateMessages = {
        // eslint-disable-next-line no-template-curly-in-string
        required: '${label} é um campo necessário!',
    }

    return (
        <Content type="flex" style={{minHeight: '89vh', padding: '85px 15% 3% 15%'}}>
            <Card>
                <Form {...layoutFormat}
                    name="newJob"
                    layout="vertical"
                    validateMessages={validateMessages}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <h2>Nova Vaga</h2>
                    <Form.Item
                        label="Descrição"
                        name="description"
                        rules={[{ required: true}]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.List name="requirements">
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                        <Form.Item
                                            label={index === 0 ? 'Requisitos' : ''}
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
                                                    message: "Por favor, insira algum requisito.",
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
                                                Adicionar um requisito
                                            </Button>
                                        <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                        <Col span={12}>
                            <Form.List name="qualifications">
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                        <Form.Item
                                            label={index === 0 ? 'Diferenciais' : ''}
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
                                                message: "Por favor, insira algum diferencial.",
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
                                                Adicionar um diferencial
                                            </Button>
                                        <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Informações adicionais"
                        name="additionalInfo"
                        rules={[{ required: true}]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                    <h3>Local</h3>
                    <Input.Group>
                        <Row gutter={24}>
                            <Col span={9}>
                                <Form.Item
                                    label="Endereço"
                                    name="street"
                                    rules={[{ required: true}]}     
                                >
                                    <Input style={{width: '100%'}}/>
                                </Form.Item>
                            </Col>
                            <Col span={3}>
                                <Form.Item
                                    label="Número"
                                    name="number"
                                    rules={[{ required: true}]}
                                >
                                    <InputNumber style={{width: '100%'}}  />
                                </Form.Item>
                            </Col>
                            <Col span={7}>
                                <Form.Item
                                    label="Cidade"
                                    name="city"
                                    rules={[{ required: true}]}     
                                >
                                    <Input style={{width: '100%'}}/>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    label="Estado"
                                    name="state"
                                    rules={[{ required: true}]}     
                                >
                                    <Input style={{width: '100%'}}/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Input.Group>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit" >
                            Adicionar nova vaga
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Content>
    );
}


export default NewJobOffer;
    
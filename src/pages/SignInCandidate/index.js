import React, { useState } from 'react';
import { Layout, Row } from 'antd';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

import './style.css';
import api from '../../services/Api';

const { Content } = Layout;

const SignInComponent = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(){
        let response = await api.post("/candidato/loginCheck", {
            email, password
        });
        var token = "Bearer " + response.data.token;
        var name = response.data.user.name;
        var cpf = response.data.user.cpf;
        var id = response.data.user._id;

        dispatch({
            type: "SET_TOKEN",
            payload: {
                token,
                name,
                cpf,
                id,
                email,
            }
        });
        
        history.push("/candidato/inicio");
       
    }

    return (
        <Content className= "login">
            <Row>
                <input type="text" onChange = {event => setEmail(event.target.value)}/>
            
                <input type="text" onChange = {event => setPassword(event.target.value)}/>
                
                <button type="submit" onClick = {handleSubmit}>Teste</button>
            </Row>
        </Content>
    );
}


export default SignInComponent;
    
import React, { useState } from 'react';
import { Layout, Row } from 'antd';
import { useSelector } from 'react-redux';
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


    return (
        {checked} ?
        <Content className= "login">
            <Row>

                <input type="text" onChange = { event => setEmail(event.target.value) }/>
            
                <input type="text" onChange = { event => setPassword(event.target.value) }/>
                
                <button type="submit" onClick = { handleSubmit }>Teste</button>

            </Row>
        </Content>
        : <></>
    );
}


export default SignInComponent;
    
import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Layout, Row } from 'antd';
import { Link, useHistory } from 'react-router-dom';


import './style.css';

const About = () => {

    const history = useHistory();
    
    const tipo = useSelector(state => state.user.tipo ? state.user.tipo : "");

    const isLogged = useSelector(state => state.user.isLogged);

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
        {checked} ? <Layout>
            <Row type="flex" justify="center" align="middle" style={{minHeight: '90vh'}}>
                <Col className= "about">
                    <Card>
                        <h1>Seja bem vindo ao Employ U!</h1>
                        <br/>
                        
                        <h3>Visto a necessidade da automatização para processos de contratação e de ofertas de vagas, 
                            como: divulgação de vagas, recebimento e análise de currículos, testes simples que são necessários 
                            antes de uma entrevista, aplicação para uma determinada vaga,
                         feedback para empresas e para os candidatos, entre outras atividades.
                         As atividades citadas acima envolvem tanto a empresa que busca um novo funcionário, 
                         quanto o candidato para aquele trabalho. E para facilitar esse serviço que pode se 
                         tornar exaustivo para os envolvidos, 
                         o nosso grupo decidiu criar o Employ you, ferramenta voltada para a automatização das 
                         atividades recrutamento, seleção e análise para preencher aquela vaga.
                        </h3>
                        <br/>
                        <Link to="/"><h2>Voltar para a página inicial</h2></Link>
                    </Card> 
                </Col>
            </Row>
        </Layout>
        :<></>
    );
}

    

export default About;
    
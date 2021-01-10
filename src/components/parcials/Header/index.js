import React from 'react';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';

import './style.css';
import Nav from '../../Nav';

const { Header } = Layout;

const HeaderComponent = () => {
    const tipo = useSelector(state => state.user.tipo ? state.user.tipo : "");
    const isLogged = useSelector(state => state.user.isLogged);

    function check_nav_type(){
        if(isLogged){
            if (tipo === "Candidate") {
                return <Nav />
            }
            if (tipo === "Company") {
                // TODO: Company nav
            }
        }
        return <span>Recrute ou seja recrutado de forma rápida e eficiente</span>
    }

    let navbar_component = check_nav_type();
    return (

        <Header className="header">
            <div><h2>EmployU</h2></div>
            {navbar_component}
        </Header>
    );
}


export default HeaderComponent;

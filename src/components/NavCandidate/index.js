import React, { useState,  } from 'react';
import {  useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined, FileDoneOutlined, SolutionOutlined } from '@ant-design/icons';

import './style.css';

const { SubMenu } = Menu;


function logout(){
    localStorage.clear();
    window.location.reload();
}



const NavComponent = () => {
    const [current, setCurrent] = useState('new');
    const history = useHistory();

    function historyResume(){
        history.push("/candidato/curriculo");
    }

    function handleClick(e){
        switch (e.key){
            case current:
                break
            case 'new':
                //todo get new
                setCurrent(e.key)
                break;
            case 'participate':
                //todo get applied
                setCurrent(e.key)
                break;
            case 'user-data':
                //todo get edit data
                setCurrent(e.key);
                historyResume();
                break;
            case 'logout':
                logout();
                break;
            default:
                break;
        }
    }
    return (
        <Menu onClick={ handleClick } selectedKeys={[current]} theme="dark" mode="horizontal">
            <Menu.Item icon={<FileDoneOutlined />} key="new">Novas vagas</Menu.Item>
            <Menu.Item icon={<SolutionOutlined />} key="participate">Vagas ingressadas</Menu.Item>
            <SubMenu key="SubMenu" title="Perfil" style={{float: 'right'}} icon={<UserOutlined />} >
                <Menu.Item key="user-data" icon={<ProfileOutlined />} >Dados pessoais</Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />}>Sair</Menu.Item>
            </SubMenu>
        </Menu>
    );
}


export default NavComponent;
    
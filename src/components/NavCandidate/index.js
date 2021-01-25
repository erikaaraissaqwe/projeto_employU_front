import React, { useState,  } from 'react';
import {  useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined, FileDoneOutlined, SolutionOutlined } from '@ant-design/icons';

import './style.css';

const { SubMenu } = Menu;






const NavComponent = () => {
    const [current, setCurrent] = useState('new');
    const history = useHistory();

    function logout(){
        localStorage.clear();
        history.push("/");
        window.location.reload();
    }
    const handleClick = (e) => {
        switch (e.key){
            case 'new':
                //todo get new
                setCurrent(e.key);
                history.push("/candidato/inicio");
                break;
            case 'participate':
                setCurrent(e.key);
                history.push('/candidato/concorrentes');
                break;
            case 'user-data':
                setCurrent(e.key);
                history.push("/candidato/curriculo/list");
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
    
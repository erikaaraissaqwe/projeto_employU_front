import React, { useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined, FileDoneOutlined, SolutionOutlined } from '@ant-design/icons';

import './style.css';
import { useHistory } from 'react-router-dom';

const { SubMenu } = Menu;

function logout(){
    localStorage.clear();
    window.location.reload();
}

const NavComponent = () => {
    const [current, setCurrent] = useState('new');
    const history = useHistory();

    const handleClick = (e) => {
        switch (e.key){
            case 'new':
                setCurrent(e.key);
                history.push('/candidato/inicio');
                break;
            case 'participate':
                setCurrent(e.key);
                history.push('/candidato/concorrentes');
                break;
            case 'user-data':
                //todo get edit data
                setCurrent(e.key);
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
                <Menu.Item key="user-data" icon={<ProfileOutlined />}>Dados pessoais</Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />}>Sair</Menu.Item>
            </SubMenu>
        </Menu>
    );
}


export default NavComponent;
    
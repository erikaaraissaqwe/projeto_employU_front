import React, { useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined, FileDoneOutlined, AuditOutlined, FileAddOutlined } from '@ant-design/icons';

import './style.css';

const { SubMenu } = Menu;

function logout(){
    localStorage.clear();
    window.location.reload();
}

const NavComponent = () => {
    const [current, setCurrent] = useState('open');

    function handleClick(e){
        switch (e.key){
            case current:
                break
            case 'open':
                //todo get new
                setCurrent(e.key)
                break;
            case 'finished':
                //todo get applied
                setCurrent(e.key)
                break;
            case 'user-data':
                //todo get edit data
                setCurrent(e.key)
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
            <Menu.Item icon={<FileDoneOutlined />} key="open">Vagas abertas</Menu.Item>
            <Menu.Item icon={<AuditOutlined />} key="finished">Vagas finalizadas</Menu.Item>
            <Menu.Item icon={<FileAddOutlined />} key="add">Nova vaga</Menu.Item>
            <SubMenu key="SubMenu" title="Perfil" style={{float: 'right'}} icon={<UserOutlined />} >
                <Menu.Item key="user-data" icon={<ProfileOutlined />}>Dados da empresa</Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />}>Sair</Menu.Item>
            </SubMenu>
        </Menu>
    );
}


export default NavComponent;
    
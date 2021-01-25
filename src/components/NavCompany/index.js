import React, { useState } from 'react';
import {  useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, LogoutOutlined, FileDoneOutlined, AuditOutlined, FileAddOutlined } from '@ant-design/icons';

import './style.css';

const { SubMenu } = Menu;

function logout(){
    localStorage.clear();
    window.location.reload();
}

const NavComponent = () => {
    const [current, setCurrent] = useState('open');
    const history = useHistory();

    function handleClick(e){
        switch (e.key){
            case 'open':
                history.push("/empresa/inicio")
                setCurrent(e.key)
                break;
            case 'finished':
                history.push("/empresa/fechadas")
                setCurrent(e.key)
                break;
            case "add":
                history.push("/empresa/nova")
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
                <Menu.Item key="logout" icon={<LogoutOutlined />}>Sair</Menu.Item>
            </SubMenu>
        </Menu>
    );
}


export default NavComponent;
    
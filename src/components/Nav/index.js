import React from 'react';
import { Menu } from 'antd';

import './style.css';


const NavComponent = () => {
    return (
        <Menu theme="dark"  mode="inline">
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
            <Menu.Item key="3">Sobre</Menu.Item>
        </Menu>
    );
}


export default NavComponent;
    
import * as React from 'react';
import {Card, Layout} from 'antd';
import {Outlet, useHref, useNavigate} from 'react-router-dom';

import NavbarHeader from "./navbar-header.jsx";

import './style.css';


const Dashboard = () => {
    const [collapsed, setCollapsed] = React.useState(false);
    const navigate = useNavigate();
    const href = useHref(window.location);

    const pathString = (key) => {
        const lastIndex = key.lastIndexOf("/");
        return key.substring(lastIndex + 1);
    };

    return (
        <Layout style={{height: "100vh"}}>
            <NavbarHeader/>
            <Layout>
                <Layout.Content>
                    <div style={{padding: 14, background: '#F4F4F4'}}>
                        <Card>
                            <Outlet/>
                        </Card>
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    );
};


export default Dashboard;
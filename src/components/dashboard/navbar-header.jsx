import {useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Layout, Avatar, Dropdown} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';

import deleteConfirm from "../deleteConfirm.jsx";


const NavbarHeader = () => {
    const {userMe} = useSelector(s => s.auth);
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();


    // user avatar items
    const items = [
        {
            key: 'LOG_OUT',
            label: t("Log out"),
            icon: <LogoutOutlined/>,
            onClick: () => deleteConfirm({
                isAction: false,
                submit() {
                    localStorage.clear();
                    navigate('/login');
                    window.location.reload();
                }
            })
        },
    ];


    return (
        <Layout.Header className="navbar-header">
            <div>
                <h3>{userMe?.library?.name}</h3>
            </div>
            <div style={{marginTop: '-5px'}}>
                {userMe?.fullName}
                <Dropdown
                    trigger={['click']}
                    placement="topRight"
                    menu={{items}}
                >
                    <Avatar className='custom-avatar'>A</Avatar>
                </Dropdown>
            </div>
        </Layout.Header>
    )
}


export default NavbarHeader;
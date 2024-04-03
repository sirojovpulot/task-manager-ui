import {useDispatch, useSelector} from "react-redux";
import {LoginOutlined} from '@ant-design/icons';
import {Button, Card, Col, Form, Input, Row} from 'antd';

// style css
import './style.css';
import {postSignIn, updateAuthState} from "../../redux/actions/index.js";
import {Link} from "react-router-dom";
import {REG_PREFIX_PATH} from "../../config/AppConfig.js";


const Login = () => {
    const {submitBtnLoading} = useSelector(s => s.auth);
    // const [modal, setModal] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (value) => {
        dispatch(updateAuthState({submitBtnLoading: true}));
        dispatch(postSignIn({data: value}))
    };


    return (
        <Row align="middle" className="login-page">
            <Col xs={8} lg={8}></Col>
            <Col xs={14} lg={8}>
                <Card>
                    <div className="px-5">
                        <h1 className="mb-2 text-uppercase">Tizimga kirish</h1>
                        <Form name="loginForm" layout="vertical" onFinish={onSubmit}>
                            <Form.Item
                                name="username"
                                label="Login"
                                rules={[{required: true, min: 6, max: 20, message: 'Iltimos kiriting'}]}
                            >
                                <Input placeholder="Logini kiriting"/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Parol"
                                rules={[{required: true, message: 'Iltimos kiriting'}]}
                            >
                                <Input.Password placeholder="Parolni kiriting"/>
                            </Form.Item>
                            <Form.Item>
                                <Button icon={<LoginOutlined/>} loading={submitBtnLoading} block type="primary"
                                        htmlType="submit">
                                    Tizimga kirish
                                </Button>
                                <p></p>
                                <Link to={REG_PREFIX_PATH}>Register</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </Col>
        </Row>
    );
}


export default Login;
import {useDispatch, useSelector} from "react-redux";
import {LoginOutlined} from '@ant-design/icons';
import {Button, Card, Col, Form, Input, Row} from 'antd';

// style css
import './style.css';
import {postSignUp, updateAuthState} from "../../redux/actions/index.js";
import {Link} from "react-router-dom";
import {LOGIN_PREFIX_PATH} from "../../config/AppConfig.js";


const Register = () => {
    const {submitBtnLoading} = useSelector(s => s.auth);
    // const [modal, setModal] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (value) => {
        dispatch(updateAuthState({submitBtnLoading: true}));
        dispatch(postSignUp({data: value}))
    };


    return (
        <Row align="middle" className="login-page">
            <Col xs={8} lg={8}></Col>
            <Col xs={14} lg={8}>
                <Card>
                    <div className="px-5">
                        <h1 className="mb-2 text-uppercase">Tizimda ro'yxatdan o'tish</h1>
                        <Form name="loginForm" layout="vertical" onFinish={onSubmit}>
                            <Form.Item
                                name="fullName"
                                label="FullName"
                                rules={[{required: true, message: 'Iltimos kiriting'}]}
                            >
                                <Input placeholder="To'liq ism familiyangizni kiriting"/>
                            </Form.Item>
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
                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder={"Parolni qayta kiririting"}/>
                            </Form.Item>
                            <Form.Item>
                                <Button icon={<LoginOutlined/>} loading={submitBtnLoading} block type="primary"
                                        htmlType="submit">
                                    Ro'yxatdan o'tish
                                </Button>
                                <p></p>
                                <Link to={LOGIN_PREFIX_PATH}>Login</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </Col>
        </Row>
    );
}


export default Register;
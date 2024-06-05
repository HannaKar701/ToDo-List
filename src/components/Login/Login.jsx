import { ConfigProvider, Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { constants } from '../../constants/constants';
import api from '../../api/index';

import './index.css';

function Login() {
    const apiLogin = 'https://todo-redev.herokuapp.com/api/auth/login';
    const navigate = useNavigate();

    const onFinish = async (data) => {
        try {
            const response = await api.post('/api/auth/login', data);
            localStorage.setItem('token', response.data.token);
            navigate('/todo-list');
        } catch (error) {
            console.log('Ошибка при попытке войти в аккаунт:', error);
        }
    };

    return (
        <>
            <div className="login-wrapper">
                <h1 className="login-title">{constants.loginTitle}</h1>
                <ConfigProvider
                    theme={{
                        components: {
                            Form: {
                                labelColor: 'white',
                            },
                        },
                    }}>
                    <Form
                        className="login-form"
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off">
                        <Form.Item
                            label={constants.labelMail}
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: constants.mailValidation,
                                },
                                {
                                    required: true,
                                    message: constants.mailRequired,
                                },
                            ]}>
                            <Input placeholder={constants.mailPlaceholder} />
                        </Form.Item>

                        <Form.Item
                            label={constants.passwordLabel}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: constants.passwordRequired,
                                },
                            ]}>
                            <Input.Password placeholder={constants.passwordPlaceholder} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button className="form-button" type="primary" htmlType="submit">
                                {constants.loginButton}
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
            <p className="login-text">
                {constants.signUpLoginForm} <Link to="/registration">{constants.signUpText}</Link>
            </p>
        </>
    );
}

export default Login;

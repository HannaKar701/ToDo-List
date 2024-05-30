import { ConfigProvider, Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { constants } from '../../constants/constants';

import './index.css';

function Login() {
    const apiLogin = 'https://todo-redev.herokuapp.com/api/auth/login';
    const navigate = useNavigate();
    const sendLoginForm = (data) => {
        return fetch(apiLogin, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('HTTP Error ' + response.status);
            }
        });
    };

    const onFinish = (values) => {
        sendLoginForm(values)
            .then((data) => {
                localStorage.setItem('token', data.token);
                navigate('/todo-list');
            })
            .catch((error) => console.log(error));
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

import { useRef, useEffect } from 'react';
import { ConfigProvider, Button, Form, Input, InputNumber, Select } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { constants } from '../../constants/constants';
import api from '../../api/index';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function RegistrationForm() {
    const formRef = useRef(null);
    const inputRef = useRef(null);

    const sendRegistrationForm = async (user) => {
        try {
            await api.post('/api/users/register', user);
            formRef.current.resetFields();
            toast.success(constants.successfullSubmit);
        } catch (error) {
            console.log('Ошибка регистрации', error);
        }
    };

    const validatePassword = (_, value) => {
        if (!value) {
            return Promise.reject(constants.passwordRequired);
        }
        if (value.length < 8) {
            return Promise.reject(constants.passwordLength);
        }
        if (!/(?=.*[A-Z])/.test(value)) {
            return Promise.reject(constants.passwordUpperCase);
        }
        if (!/(?=.*[a-z])/.test(value)) {
            return Promise.reject(constants.passwordLowerCase);
        }
        if (!/(?=.*\d)/.test(value)) {
            return Promise.reject(constants.passwordDigit);
        }
        if (!/[^A-Za-z0-9]/.test(value)) {
            return Promise.reject(constants.passwordSymbol);
        }
        return Promise.resolve();
    };

    const validateAge = (_, value) => {
        if (!value) {
            return Promise.reject(constants.ageRequired);
        }
        if (value < 0 || value > 100) {
            return Promise.reject(constants.ageValidation);
        }
        return Promise.resolve();
    };

    useEffect(() => inputRef.current.focus(), []);

    return (
        <>
            <div className="registration-form__wrapper">
                <h1>{constants.registrationFormTitle}</h1>
                <ConfigProvider
                    theme={{
                        components: {
                            Form: {
                                labelColor: 'white',
                            },
                        },
                    }}>
                    <Form
                        ref={formRef}
                        className="registration-form"
                        name="basic"
                        labelCol={{
                            span: 6,
                            style: {
                                color: 'white',
                            },
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={sendRegistrationForm}
                        autoComplete="off">
                        <Form.Item
                            label={constants.usernameLabel}
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: constants.nameRequired,
                                },
                            ]}>
                            <Input ref={inputRef} placeholder={constants.namePlaceholder} />
                        </Form.Item>

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
                                    validator: validatePassword,
                                },
                            ]}>
                            <Input.Password placeholder={constants.passwordPlaceholder} />
                        </Form.Item>

                        <Form.Item
                            label={constants.genderLabel}
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: constants.genderRequired,
                                },
                            ]}>
                            <Select placeholder={constants.genderPlaceholder} allowClear>
                                <Select.Option value="male">{constants.genderMale}</Select.Option>
                                <Select.Option value="female">
                                    {constants.genderFemale}
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={constants.ageLabel}
                            name="age"
                            rules={[
                                {
                                    required: true,
                                    validator: validateAge,
                                },
                            ]}>
                            <InputNumber
                                placeholder={constants.agePlaceholder}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button
                                className="registration-form__button"
                                type="primary"
                                htmlType="submit">
                                {constants.signUpText}
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
            <p className="registration-form__text">
                {constants.textForLoginRegistrationForm} <Link to="/">{constants.loginText}</Link>
            </p>
            <ToastContainer position="top-center" />
        </>
    );
}

export default RegistrationForm;

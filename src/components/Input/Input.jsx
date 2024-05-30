/* eslint-disable react/prop-types */

import { Button, Space, Input, ConfigProvider } from 'antd';
import { useState, useEffect, useRef } from 'react';

import { constants } from '../../constants/constants';

import './index.css';

function InputComponent({ updateTaskList }) {
    const [task, setTask] = useState('');
    const token = localStorage.getItem('token');
    const apiLogin = 'https://todo-redev.herokuapp.com/api/todos';
    const inputLink = useRef(null);

    const changeTask = (event) => setTask(event.target.value);

    const send = () => {
        const newTask = {
            title: task,
        };

        return fetch(apiLogin, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('HTTP Error ' + response.status);
                }
            })
            .then(() => {
                fetch('https://todo-redev.herokuapp.com/api/todos', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('HTTP Error ' + response.status);
                        }
                    })
                    .then((data) => {
                        updateTaskList(data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                setTask('');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pressButtonCreateTask = (event) => {
        if (event.key === 'Enter') {
            send();
        }
    };

    useEffect(() => inputLink.current.focus(), []);

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        colorPrimary: '#8658ff',
                        colorPrimaryHover: '#956dfc',
                        colorPrimaryActive: '#956dfc',
                        colorPrimaryBorder: '#8658ff',
                    },
                    Input: {
                        hoverBorderColor: '#8658ff',
                        activeBorderColor: '#8658ff',
                    },
                },
            }}>
            <Space.Compact
                style={{
                    width: '65%',
                }}>
                <Input
                    ref={inputLink}
                    value={task}
                    onChange={changeTask}
                    onKeyDown={pressButtonCreateTask}
                    style={{ marginBottom: '50px' }}
                    placeholder={constants.taskInputPlaceholder}
                />
                {task === '' ? (
                    <Button type="primary" size="medium" disabled>
                        {constants.buttonAddTask}
                    </Button>
                ) : (
                    <Button onClick={() => send()} type="primary" size="medium">
                        {constants.buttonAddTask}
                    </Button>
                )}
            </Space.Compact>
        </ConfigProvider>
    );
}

export default InputComponent;

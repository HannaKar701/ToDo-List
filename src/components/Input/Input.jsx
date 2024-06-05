/* eslint-disable react/prop-types */

import { Button, Space, Input, ConfigProvider } from 'antd';
import { useState, useEffect, useRef } from 'react';

import { constants } from '../../constants/constants';
import api from '../../api/index';
import { fetchData } from '../../utils/fetchData';

import './index.css';

function InputComponent({ updateTaskList }) {
    const [task, setTask] = useState('');
    const inputLink = useRef(null);

    const changeTask = (event) => setTask(event.target.value);

    const createTask = async () => {
        const newTask = {
            title: task,
        };

        try {
            await api.post('/api/todos', newTask);
            fetchData(updateTaskList);
            setTask('');
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    };

    const pressButtonCreateTask = (event) => {
        if (event.key === 'Enter') {
            createTask();
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
                    <Button onClick={() => createTask()} type="primary" size="medium">
                        {constants.buttonAddTask}
                    </Button>
                )}
            </Space.Compact>
        </ConfigProvider>
    );
}

export default InputComponent;

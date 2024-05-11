/* eslint-disable react/prop-types */

import { Button, Space, Input, ConfigProvider } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

import { constants } from '../../constants/constants';

const InputComponent = ({ arrList, setArrList }) => {
    const [task, setTask] = useState('');
    const changeTask = (event) => setTask(event.target.value);
    const send = () => {
        const newTask = {
            id: uuidv4(),
            title: task,
        };
        setArrList([...arrList, newTask]);
        setTask('');
    };

    const pressButtonCreateTask = (event) => {
        if (event.key === 'Enter') {
            send();
        }
    };

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
                    value={task}
                    onChange={changeTask}
                    onKeyDown={pressButtonCreateTask}
                    style={{ marginBottom: '50px' }}
                    placeholder={constants.taskInputPlaceholder}
                />
                <Button onClick={() => send()} type="primary" size="medium">
                    {constants.buttonAddTask}
                </Button>
            </Space.Compact>
        </ConfigProvider>
    );
};

export default InputComponent;

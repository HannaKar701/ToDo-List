/* eslint-disable react/prop-types */
import { Button, Space, Input, ConfigProvider, Alert } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRef, useEffect } from 'react';

import { constants } from '../../constants/constants';

import './index.css';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

function List({ task, updateTaskList }) {
    const { title: taskText, id: taskId, isCompleted: taskCompleted } = task;
    const taskAPI = `https://todo-redev.herokuapp.com/api/todos/${taskId}`;
    const getAPI = 'https://todo-redev.herokuapp.com/api/todos';
    const isCompletedAPI = `https://todo-redev.herokuapp.com/api/todos/${taskId}/isCompleted`;
    const token = localStorage.getItem('token');
    const link = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(taskText);
    const [originalTask, setOriginalTask] = useState(taskText);

    const fetchAPI = (link, method, data = null) => {
        return fetch(link, {
            method: method,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': method === 'PATCH' ? 'application/json' : undefined,
            },
            body: data ? JSON.stringify(data) : undefined,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('HTTP Error ' + response.status);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (event) => setEditedTask(event.target.value);

    const handleEdit = () => setIsEditing((prevState) => !prevState);

    const saveEdit = () => {
        const data = {
            title: editedTask,
        };

        if (editedTask !== '') {
            return fetchAPI(taskAPI, 'PATCH', data)
                .then(() => {
                    return fetchAPI(getAPI, 'GET');
                })
                .then((data) => {
                    setIsEditing((prevState) => !prevState);
                    updateTaskList(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        return data;
    };

    const cancelEdit = () => {
        setEditedTask(originalTask);
        setIsEditing(!isEditing);
    };

    const deleteTask = () => {
        return fetchAPI(taskAPI, 'DELETE')
            .then(() => {
                return fetchAPI(getAPI, 'GET');
            })
            .then((data) => {
                updateTaskList(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (isEditing) {
            link.current?.focus();
            setOriginalTask(editedTask);
        }
    }, [isEditing]);

    const setIsCompleted = () => {
        return fetchAPI(isCompletedAPI, 'PATCH')
            .then(() => {
                return fetchAPI(getAPI, 'GET');
            })
            .then((data) => {
                updateTaskList(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <li>
                {isEditing ? (
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    colorPrimary: '#4ba0fa',
                                    colorPrimaryHover: '#72b6fc',
                                    colorPrimaryBorder: '#4ba0fa',
                                },
                                Input: {
                                    hoverBorderColor: '#4ba0fa',
                                    activeBorderColor: '#4ba0fa',
                                },
                            },
                        }}>
                        <Space.Compact
                            style={{
                                width: '100%',
                            }}>
                            <Input ref={link} value={editedTask} onChange={handleChange} />
                            <Button onClick={() => saveEdit()} type="primary" size="medium">
                                {constants.buttonEditTask}
                            </Button>
                            <Button
                                type="primary"
                                icon={<CloseOutlined />}
                                danger
                                onClick={() => cancelEdit()}
                            />
                        </Space.Compact>
                    </ConfigProvider>
                ) : (
                    <>
                        <p
                            style={{
                                textDecoration: taskCompleted ? 'line-through' : 'none',
                                color: taskCompleted ? '#73bd99' : 'white',
                            }}
                            onClick={() => setIsCompleted()}>
                            {editedTask}
                        </p>
                        <img src={editIcon} alt="Edit" onClick={handleEdit} />
                        <img src={deleteIcon} alt="Delete" onClick={deleteTask} />
                    </>
                )}
            </li>
            {editedTask === '' && (
                <Alert
                    className="edit-task__error"
                    message={constants.inputValadationError}
                    type="error"
                    showIcon
                />
            )}
        </>
    );
}

export default List;

/* eslint-disable react/prop-types */
import { Button, Space, Input, ConfigProvider, Alert } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useRef, useEffect } from 'react';

import { constants } from '../../constants/constants';
import { fetchData } from '../../utils/fetchData';
import api from '../../api/index';

import './index.css';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

function List({ task, updateTaskList }) {
    const { title: taskText, id: taskId, isCompleted: taskCompleted } = task;
    const link = useRef(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(taskText);
    const [originalTask, setOriginalTask] = useState(taskText);

    useEffect(() => {
        if (isEditing) {
            link.current?.focus();
            setOriginalTask(editedTask);
        }
    }, [isEditing]);

    const handleChange = (event) => setEditedTask(event.target.value);

    const handleEdit = () => setIsEditing((prevState) => !prevState);

    const saveEdit = async () => {
        const data = {
            title: editedTask,
        };

        if (editedTask !== '') {
            try {
                await api.patch(`/api/todos/${taskId}`, data);
                setIsEditing((prevState) => !prevState);
            } catch (error) {
                console.error('Ошибка при обновлении данных:', error);
            }
        }
    };

    const cancelEdit = () => {
        setEditedTask(originalTask);
        setIsEditing(!isEditing);
    };

    const deleteTask = async () => {
        try {
            await api.delete(`/api/todos/${taskId}`);
            fetchData(updateTaskList);
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        }
    };

    const setIsCompleted = async () => {
        try {
            await api.patch(`/api/todos/${taskId}/isCompleted`);
            fetchData(updateTaskList);
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
        }
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

/* eslint-disable react/prop-types */
import { Button, Space, Input, ConfigProvider } from 'antd';
import { useState } from 'react';
import { useRef, useEffect } from 'react';

import { constants } from '../../constants/constants';

import './index.css';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

const List = ({ task, arrList, setArrList }) => {
    const taskText = task.title;
    const link = useRef(null);
    const [isDone, setIsDone] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(taskText);

    const handleChange = (event) => {
        setEditedTask(event.target.value);
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const deleteTask = () => {
        const updatedTaskList = arrList.filter((val) => val.id !== task.id);
        setArrList(updatedTaskList);
    };

    useEffect(() => {
        if (isEditing) {
            link.current.focus();
        }
    }, [isEditing]);

    return (
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
                        <Button onClick={() => handleEdit()} type="primary" size="medium">
                            {constants.buttonEditTask}
                        </Button>
                    </Space.Compact>
                </ConfigProvider>
            ) : (
                <p
                    style={{
                        textDecoration: isDone ? 'line-through' : 'none',
                        color: isDone ? '#73bd99' : 'white',
                    }}
                    onClick={() => setIsDone(!isDone)}>
                    {editedTask}
                </p>
            )}
            {isEditing === false && (
                <>
                    <img src={editIcon} alt="Edit" onClick={handleEdit} />
                    <img src={deleteIcon} alt="Delete" onClick={deleteTask} />
                </>
            )}
        </li>
    );
};

export default List;

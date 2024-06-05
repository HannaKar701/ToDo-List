import { useEffect, useState } from 'react';

import InputComponent from './components/Input/Input';
import List from './components/List/List';
import { Link } from 'react-router-dom';
import { constants } from './constants/constants';
import api from './api/index';

import './App.css';

function App() {
    const [taskList, setTaskList] = useState([]);

    const clearToken = () => localStorage.removeItem('token');

    const updateTaskList = (data) => setTaskList(data);

    useEffect(() => {
        async function getTasks() {
            try {
                const response = await api.get('/api/todos');
                setTaskList(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        }
        getTasks();
    }, []);

    return (
        <>
            <main className="main">
                <h1>{constants.title}</h1>
                <InputComponent updateTaskList={updateTaskList} />
                {taskList.map((task) => (
                    <List key={task.id} task={task} updateTaskList={updateTaskList} />
                ))}
            </main>
            <Link to="/" onClick={() => clearToken()}>
                {constants.logOut}
            </Link>
        </>
    );
}

export default App;

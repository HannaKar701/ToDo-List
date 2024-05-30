import { useEffect, useState } from 'react';

import InputComponent from './components/Input/Input';
import List from './components/List/List';
import { Link } from 'react-router-dom';
import { constants } from './constants/constants';

import './App.css';

function App() {
    const [taskList, setTaskList] = useState([]);
    const token = localStorage.getItem('token');

    const clearToken = () => localStorage.removeItem('token');

    const updateTaskList = (data) => setTaskList(data);
    useEffect(() => {
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
                setTaskList(data);
            })
            .catch((error) => {
                console.log(error);
            });
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

import { useState } from 'react';

import InputComponent from './components/Input/Input';
import List from './components/List/List';

import './App.css';

function App() {
    const [arrList, setArrList] = useState([]);

    return (
        <>
            <div className="main">
                <h1>Get things done!</h1>
                <InputComponent arrList={arrList} setArrList={setArrList} />
                {arrList.map((task) => (
                    <List key={task.id} task={task} arrList={arrList} setArrList={setArrList} />
                ))}
            </div>
            <a href="#">Log out</a>
        </>
    );
}

export default App;

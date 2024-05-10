import { useState } from 'react';

import InputComponent from './components/Input/Input';
import List from './components/List/List';
import { constants } from './constants/constants';

import './App.css';

function App() {
    const [arrList, setArrList] = useState([]);

    return (
        <>
            <div className="main">
                <h1>{constants.title}</h1>
                <InputComponent arrList={arrList} setArrList={setArrList} />
                {arrList.map((task) => (
                    <List key={task.id} task={task} arrList={arrList} setArrList={setArrList} />
                ))}
            </div>
            <a href="#">{constants.logOut}</a>
        </>
    );
}

export default App;

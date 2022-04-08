import { compose } from '@mui/system';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
const axios = require("axios");



function GetUserTodos(){
    const [todoQueries, setTodoQueries] = useState([]);
    const token = localStorage.getItem('token')
    const history = useHistory()
    
    axios({
        method:'GET',
        'url': 'http://127.0.0.1:5000/task/show',
        mode: 'cors',
        cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        'Access-Control-Allow-Origin':'*', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`  
        },
    }).then(response=>{
        setTodoQueries(JSON.stringify(response.data));
    })
    
    return (
        <div>
            { (token && token !== "" && token !== undefined) ?  (
            <div>
                <h1>Todos</h1>
                <ul>
                    {todoQueries.map(todo => (
                        <li key={todo.id}>
                            <h2>{todo.title}</h2>
                            <p>{todo.description}</p>
                            <p>{todo.completed}</p>
                        </li>
                    ))}
                </ul>
                
            </div>
        
                ): history.push('/login') }
        </div>
    )
}

export default GetUserTodos
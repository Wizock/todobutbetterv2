import { compose } from '@mui/system';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
const axios = require("axios");



function GetUserTodos(){
    const [todoQueries, setTodoQueries] = useState();
    const token = useEffect(() => {localStorage.getItem('token')},[]);
    const history = useHistory()
    useEffect(()=>{ axios({
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
        setTodoQueries(response.data);
    })},[])
    
    return (
        <div>
            {(token && token !== "" && token !== undefined) ? (
                <div>
                    <h1>Todos</h1>
                    <ul>
                        {todoQueries.map(todoQuery => (
                            <li key={todoQuery.id} >
                                <div>
                                    <h2>{todoQuery.title}</h2>
                                    <p> {todoQuery.description}</p>
                                    <p> {todoQuery.startingDateValue}</p>
                                    <p> {todoQuery.dueDateValue}</p>
                                    <p> {todoQuery.dueTimeValue}</p>
                                    <p> {todoQuery.priority}</p>
                                    <p> {todoQuery.taskOwner}</p>
                                </div>
                            </li>
                        ))}

                    </ul>
                </div>
            ) : history.push('/login')}
        </div>
    )
}

export default GetUserTodos



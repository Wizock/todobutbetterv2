import { compose } from '@mui/system';
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
const axios = require("axios");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

function GetUserTodos(){
    
    const [todoQueries, setTodoQueries] = useState([]);
    const history = useHistory()
    const token = localStorage.getItem('token') 
    useEffect(()=>{ 
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
        setTodoQueries(response.data);
    })},[])
    
    console.log(todoQueries)
    return (
        
        <div>
            <div>
                <h1>Todos</h1>
                <ul>
                    {todoQueries.map((todoQuery) => (
                        <li key={todoQuery.id}>
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
        </div>
    )
}

export default GetUserTodos
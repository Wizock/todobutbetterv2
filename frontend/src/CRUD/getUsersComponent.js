import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
const axios = require("axios");

function GetUser(){
    const [user, setUser] = useState(0);
    axios(
        {
        method:'GET',
        'url': 'http://127.0.0.1:5000/session',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        'Access-Control-Allow-Origin':'*', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response=>{
        // alert(JSON.stringify(response.data))
        setUser(response.data)
    })
    const token = sessionStorage.getItem('token')
    const history = useHistory()
    return (
        <div>
            { (token && token !== "" && token !== undefined) ? history.push('/login') :(user)}
        </div>
    )
}

export default GetUser
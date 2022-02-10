import React, {useState} from 'react';
const axios = require("axios");

function GetUser(){
    const [user, setUser] = useState(0);
    axios(
        {
        method:'GET',
        'url': 'http://127.0.0.1:5000/get_user',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        'Access-Control-Allow-Origin':'*', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response=>{
        alert(JSON.stringify(response.data))
        setUser(response.data)
    })
    return (
        <div>
            {user}
        </div>
    )
}

export default GetUser
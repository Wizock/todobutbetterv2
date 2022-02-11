import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './navbarComponent';
const axios = require("axios");


function updateCurrentState(){
    const token = localStorage.getItem('token')

    axios(
        {
        method:'GET',
        'url': 'http://127.0.0.1:5000/get_user',
        mode: 'cors',
        cache: 'force-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        'Access-Control-Allow-Origin':'*', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`  
        },
    }).then(response=>{
        console.log()
    })
}

function CreateTodo(){
    const token = localStorage.getItem('token')
    const history = useHistory()
    
    return (
        <div>
            { (token && token !== "" && token !== undefined) ?  (
                <div>
                    <Navbar />
                    
                    <h1>hello</h1>
                    
                </div>
                ): history.push('/login') }
        </div>
    )
}

export default CreateTodo
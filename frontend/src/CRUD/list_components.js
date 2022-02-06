import Navbar from "./navbarComponent";
import React, {useState} from 'react';
const axios = require("axios");

function fetchAll(){
    axios(
        {
        method:'GET',
        'url': 'http://127.0.0.1:5000/fetchAll',
        mode: 'cors',
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        'Access-Control-Allow-Origin':'*', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
    }
)
.then(response => {
    alert(JSON.stringify(response.data.access_token))
    console.log(response.data.access_token)
    sessionStorage.setItem('token', response.data.access_token);
})
}
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
const axios = require("axios");

function postRegister(email,username, password,firstname,lastname){
    
    console.log(`you posted with ${username} ${password} `)
    return axios(
            {
            method:'POST',
            'url': 'http://127.0.0.1:5000/register',
            data: JSON.stringify({
                'email':email,
                'username': username,
                'password':password,
            }),
            mode: 'cors',
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',
            'Access-Control-Allow-Origin':'*', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
}

function TReg() {
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);
    const [email, setEmail] = useState(0);
    const history = useHistory();
    
    const handleSubmit = () => { postRegister(email.toString(),username.toString(), password.toString()); history.push('/login')}
    
    return (
        <div>
            <main>
                <section className="absolute w-full h-full">
                    <div
                        className="absolute top-0 w-full h-full bg-gray-900"
                        style={{
                            backgroundImage: `url(${require("../assets/auth/register_bg_2.png")})`,
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat",
                        }}
                    ></div>
                    <div className="container mx-auto px-4 h-full">
                        <div className="flex content-center items-center justify-center h-full">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                                    <div className="rounded-t mb-0 px-6 py-6">
                                        <div className="text-center mb-3">
                                            <h6 className="text-gray-600 text-sm font-bold">Create Account Using The Following</h6>
                                        </div>
                                        <div className="btn-wrapper text-center">
                                            <button className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                                                type="button" style={{ transition: "all .15s ease", }}>
                                                <img alt="..." className="w-5 mr-1" src={ require("../assets/auth/github.svg").default}/>Github</button>
                                            <button className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs" type="button" style={{transition: "all .15s ease", }}>
                                                <img alt="..." className="w-5 mr-1" src={ require("../assets/auth/google.svg").default }/>Google</button>
                                        </div>
                                        <hr className="mt-6 border-b-1 border-gray-400" />
                                    </div>
                                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                        <div className="text-gray-500 text-center mb-3 font-bold">
                                            <small> Or Register with credentials</small>
                                        </div>
                                        <form onSubmit={handleSubmit} id='form'>
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password"> Email </label>
                                                <input type="text" id='email' className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Email" style={{ transition: "all .15s ease", }}/>
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password"> Username</label>
                                                <input type="text" id='username' className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Username" style={{ transition: "all .15s ease", }}/>
                                            </div>
                                            <div className="relative w-full mb-3">
                                                <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password" > Password</label>
                                                <input type="password" className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Password" id='password' style={{transition:"all .15s ease",}}/>
                                            </div>
                                            <div>
                                                <label className="inline-flex items-center cursor-pointer">
                                                    <input id="customCheckLogin" type="checkbox" className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5" style={{transition:"all .15s ease",}}/>
                                                    <span className="ml-2 text-sm font-semibold text-gray-700"> Remember me </span>
                                                </label>
                                            </div>
                                            <div className="text-center mt-6">
                                                <button className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full" style={{ transition: "all .15s ease", }} type="submit" onClick={() => { setEmail(document.getElementById('email').value); setUsername(document.getElementById('username').value); setPassword(document.getElementById('password').value);}}>Register</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex flex-wrap mt-6">
                                    <div className="w-1/2">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()} className="text-gray-300" >
                                            <small>Forgot password?</small>
                                        </a>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <a href="#pablo" onClick={(e) => e.preventDefault()} className="text-gray-300">
                                            <small>Create new account</small>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default TReg;

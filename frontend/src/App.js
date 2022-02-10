import React from 'react';
import {
    BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";
import LoginPage from './auth/login'
import RegisterPage from './auth/register';
import Navbar from './CRUD/navbarComponent';
import GetUser from './CRUD/getUsersComponent';


function Homepage (){
    let Login = <LoginPage />
    let Register = <RegisterPage />
    let Navbar_ = <Navbar />
    let GettingUsers = <GetUser />
    return (
        <div>
            <Router>
                <Link to="/"></Link>
                <Link to="/login"></Link>
                <Link to="/register"></Link>
                <Link to="/nav"></Link>
                <Link to="/users"></Link>


                <Switch>
                    <Route path="/login">
                        {Login}
                    </Route>
                    <Route path="/register">
                        {Register}
                    </Route>
                    <Route path="/nav">
                        {Navbar_}
                    </Route>
                    <Route path="/users">
                        {GettingUsers}
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

function App() {
    return (
    <div className="App">
        <Homepage />
    </div>
    );
}

export default App;

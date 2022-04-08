import React from 'react';
import {BrowserRouter as Router, Switch,Route,Link, useHistory} from "react-router-dom";

import LoginPage from './auth/login'
import RegisterPage from './auth/register';
import Navbar from './CRUD/navbarComponent';
import GetUser from './CRUD/getUsersComponent';
import CreateTodo from './CRUD/createTodo';
import GetUserTodos from './CRUD/showAll';
function Homepage (){
    let Login = <LoginPage />
    let Register = <RegisterPage />
    let Navbar_ = <Navbar />
    let GettingUsers = <GetUser />
    let CrudRoute = <CreateTodo />
    let todos = <GetUserTodos />

    return (
        <div>
            <Router>
                <Link to="/"></Link>
                <Link to="/login"></Link>
                <Link to="/register"></Link>
                <Link to="/nav"></Link>
                <Link to="/users"></Link>
                <Link to="/crudRoute"></Link>

                <Switch>
                    <Route path="/">
                        {todos}
                    </Route>
                    <Route path="/crudRoute">
                        {CrudRoute}
                    </Route>
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
                    <Route path="/crudRoute">
                        {CrudRoute}
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
function routeControllerLoginRequired(){
    const token = localStorage.getItem("token");
    let routes_controller = <Homepage />
    return routes_controller
}

function App() {
	const History = useHistory();

    return (
    <div className="App">
        {routeControllerLoginRequired()}
        
    </div>
    );
}

export default App;


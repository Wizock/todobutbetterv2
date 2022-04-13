import React from 'react';
import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

import LoginPage from './auth/login'
import RegisterPage from './auth/register';
import GetUser from './CRUD/getUsersComponent';
import CreateTodo from './CRUD/createTodo';
import GetUserTodos from './CRUD/showAll';


function Homepage (){
    let Login = <LoginPage />
    let Register = <RegisterPage />
    let GettingUsers = <GetUser />
    let CrudRoute = <CreateTodo />
    let Todos = <GetUserTodos />

    return (
        <div>
            <Router>
                <Link to="/todo"></Link>
                <Link to="/login"></Link>
                <Link to="/register"></Link>
                <Link to="/users"></Link>
                <Link to="/crudRoute"></Link>

                <Switch>
                    <Route path="/todo">
                        {Todos}
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

function App() {
    return <Homepage/>
}

export default App;


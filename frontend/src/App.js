import React from 'react';
import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";

import {LoginPage} from './AUTH/login'
import {RegisterPage} from './AUTH/register'
import {GetUser} from './CRUD/getUsersComponent'
import {CreateTodo} from './CRUD/createTodo'
import {GetUserTodos} from './CRUD/showAll'


function Homepage (){
    return (
        <div>
            <Router>
                <Link to="/todo"></Link>
                <Link to="/login"></Link>
                <Link to="/register"></Link>
                <Link to="/users"></Link>
                <Link to="/crudRoute"></Link>
                <Switch>
                    <Route exact path="/login" component={LoginPage}/>
                    <Route exact path="/register" component={RegisterPage}/>
                    <Route exact path="/users" component={GetUser}/>
                    <Route exact path="/crudRoute" component={CreateTodo}/>
                    <Route exact path="/todo" component={GetUserTodos}/>
                </Switch>
            </Router>
        </div>
    );
}

function App() {
    return <Homepage/>
}

export default App;


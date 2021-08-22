import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import FrontIndex from './Views/Index';
import FrontLogin from './Views/Login';
import FrontRegister from './Views/Register';

const Main = () => {
   
    return (
        <Switch>
            <Route exact path="/">
                <FrontIndex />
            </Route>
            <Route  path="/login">
                <FrontLogin />
            </Route>
            <Route exact path="/register">
                <FrontRegister />
            </Route>
        </Switch>
    );
}

export default Main;
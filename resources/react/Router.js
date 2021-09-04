import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import FrontIndex from './Views/Index';
import FrontLogin from './Views/Login';
import FrontRegister from './Views/Register';
import PrivateRoute from './PrivateRoute'

const Main = () => {
   
    return (
        <Switch>
            <PrivateRoute exact path="/" component={FrontIndex}/>
               
            <Route  path="/login" component={FrontLogin}/>
               
            <Route exact path="/register" component={FrontRegister}/>
           
        </Switch>
    );
}

export default Main;
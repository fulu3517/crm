import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import AuthStore from './Store/AuthStore';

AuthStore.getToken();

const isLoggedIn = AuthStore.appState && AuthStore.appState.isLoggedIn;

const PrivateRoute = ({
    component: Component,
    path,
    ...rest
}) => (
    <Route
        path={path}
        {...rest}
        render={
            props => isLoggedIn ? (
                <Component {...props} />
            ) :
                <Redirect
                    to={{
                        pathname:"/login",
                        state: {
                            prevLocation: path,
                            error: "Önce Giriş Yap"
                        }}
                    }
                />
        }
    
    />
)

export default withRouter(PrivateRoute);
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Main from './Router';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Store from './Store';
export default class Index extends Component {
    render() {
        
        return (
            <Provider {...Store} >
            {/* // storedaki bütün bilgileri alıyor */}
                <BrowserRouter>
                    <Route component={ Main }/>
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<Index/>,document.getElementById("index"))
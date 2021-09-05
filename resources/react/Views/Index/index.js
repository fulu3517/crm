import { inject, observer } from 'mobx-react';
import React from 'react';

const Index = (props) => {
    props.AuthStore.getToken();
    const logout = () => {
        props.AuthStore.removeToken();
        props.history.push('/login')
    }

    return <div>Burası Index <a className="btn btn-success mt-5" onClick={ logout}>Logout</a></div>
}

export default inject("AuthStore")(observer(Index));
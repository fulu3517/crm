import { inject, observer } from 'mobx-react';
import React from 'react';

const Index = (props) => {
    console.log("indexProps", props);
    props.AuthStore.getToken();

    return <div>Burası Index</div>
}

export default inject("AuthStore")(observer(Index));
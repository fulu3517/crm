import { inject, observer } from 'mobx-react';
import React from 'react';
import LayoutFront from '../../LayoutFront';

const Index = (props) => {
    props.AuthStore.getToken();
    

    return (
        <LayoutFront>
            Burası Index 
      </LayoutFront>
    )
}

export default inject("AuthStore")(observer(Index));
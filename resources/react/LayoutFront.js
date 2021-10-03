import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';


const LayoutFront = (props) => {
    props.AuthStore.getToken();
    const history = useHistory();

    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = (props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token : null;
        axios.post(`/api/authenticate`,{},{
            headers:{
                Authorization: 'Bearer '+ token
            }
        }).then((res) => {
            console.log("RESPONSE",res)
            if(!res.data.isLoggedIn){
                history.push('/login');
            }
            setUser(res.data.user);
            setIsLoggedIn(res.data.isLoggedIn);
        })
            .catch(e => {
            console.log("Error",e)
            history.push('/login');
        }); 
    },[])

    const logout = () => {
        
        axios.post(`/api/logout`,{},{
            headers:{
                Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
            }
        }).then(res => console.log(res)).catch(e => console.log(e));
        props.AuthStore.removeToken();
        history.push('/login');
    }

    return (
        <div className="test">
            <div>
                <a className="btn btn-success mt-5" onClick={logout}>Logout</a>
            </div>
            
            <div>{props.children}</div>
        </div>
    )
}

export default inject("AuthStore")(observer(LayoutFront));

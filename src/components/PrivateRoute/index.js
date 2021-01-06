import React from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import api from '../../services/Api';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({children, ...rest}) => {

    const token = useSelector(state => state.user.token);
    const id = useSelector(state => state.user.id);
    const history = useHistory();

    async function check(){

        const response = await api.get("/checkCandidate",{
            headers:{
                authorization:token,
                user_id : id
            }
        });
       
        console.log(response.data);
        if(response.data.data === 200){
            return true;
        }else if(response.data.data === 401){
            history.push("/");
            return false;
        }
        
    }

    const checkCandidate = check();
    console.log(checkCandidate);
    return (
        {checkCandidate}?
        <Route {...rest}>{children}</Route>:
        <>Sorry</>
    );

    

}
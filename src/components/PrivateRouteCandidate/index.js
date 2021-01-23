import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import api from '../../services/Api';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({children, ...rest}) => {

    const token = useSelector(state => state.user.token);
    const id = useSelector(state => state.user.id);

    async function check(){
        let response;
        try{
            response = await api.get("/checkCandidate",{
                headers:{
                    authorization:token,
                    user_id : id
                }
            });

            if(response.data.data === 200){
                return true;
            }

            return false;

        }catch(error){
            localStorage.clear();
            window.location.reload();
            console.clear();
            return false;
        }
        
    }

    const checkCandidate = check();
   
    return (
        {checkCandidate}?
        <Route {...rest}>{children}</Route>:
        <></>
    );
}
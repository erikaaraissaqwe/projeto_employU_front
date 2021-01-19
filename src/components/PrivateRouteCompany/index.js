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
        let response;
        try{
            response = await api.get("/checkCompany",{
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
            history.push("/");
            console.clear();
            return false;
        }
    }

    const checkCompany = check();
   
    return (
        {checkCompany}?
        <Route {...rest}>{children}</Route>:
        <></>
    );
}
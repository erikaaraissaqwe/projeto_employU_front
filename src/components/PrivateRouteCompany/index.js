import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import api from '../../services/Api';
import { useHistory } from 'react-router';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({children, ...rest}) => {

    const token = useSelector(state => state.user.token);
    const id = useSelector(state => state.user.id);
    const history = useHistory();
    const dispatch = useDispatch();


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
            dispatch({
                type: "LOGOUT",
                payload: {
                    isLogged : false,
                }
            });
            //window.location.reload();
            history.push('/');
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
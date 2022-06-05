import {loggingAdminIn, retrieveUserId, LogOutUser} from '../../services/authentication';
import { setAuthentication } from '../../services/authenticationSlice';
import {changePageIndex, tabTracker} from '../navigation/navigationSlice';
import { useSelector, useDispatch } from 'react-redux';// 
import React, { useEffect } from 'react';
import { getAllUsers } from '../../services/appUsersAPI';

export function AppUsers()  {

    const dispatch = useDispatch();// hooks

    const loggingOutAdminUser = async () => {
        
        try{
            const i = await LogOutUser(); 
            dispatch(setAuthentication(false));
            dispatch(changePageIndex(5));
            //alert("Success logged in");
        }catch(error){
            //alert("Here:: " + error);
        } 



    }

    useEffect( () => {


        const getUsers = async () => {

            try{
                const emails = await getAllUsers();
              
                console.log(emails.length);

                emails.forEach((data) => {
                    console.log(data);
                })
                
            }catch(error){
                alert(error)
            }
            
        }
    
        try{
            getUsers();
        }catch(error){
            alert(error);
        }

       
    }, [])


    return(
        <div className='admin-login-container'>
            

            <div className='login-container'>

                <h1 onClick={loggingOutAdminUser} >Admin Login</h1>

            </div>


        </div>
    )

}
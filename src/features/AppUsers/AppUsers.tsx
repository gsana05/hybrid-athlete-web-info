import {loggingAdminIn, retrieveUserId, LogOutUser} from '../../services/authentication';
import { setAuthentication } from '../../services/authenticationSlice';
import {changePageIndex, tabTracker} from '../navigation/navigationSlice';
import { useSelector, useDispatch } from 'react-redux';// 
import { getAllUsers, listenerForAllUsers } from '../../services/appUsersAPI';
import React, { useRef, useState, useEffect  } from "react";

export function AppUsers()  {

    //const [users, setUsers] = useState([]);
    const [users, setUsers] = useState<string[]>([]);

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

                
                const emails = await listenerForAllUsers();
              
                console.log(emails.length);

                emails.forEach((data) => {
                    console.log("got it" + data);
                })

                setUsers(emails);
                
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


                <ul className="grid_list">
                    {users && users.length > 0
                    ? users.map(( email , index) =>


                        <li className='grid-item' key={`${email}${index}`}>
                            
                            <h1 >{email} : {index}</h1>
                        
                        
                        </li>
                    )
                    : null}
                </ul>

            </div>


        </div>
    )

}
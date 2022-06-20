import {loggingAdminIn, retrieveUserId, LogOutUser} from '../../services/authentication';
import { setAuthentication } from '../../services/authenticationSlice';
import {changePageIndex, tabTracker} from '../navigation/navigationSlice';
import { useSelector, useDispatch } from 'react-redux';// 
import { getAllUsers, listenerForAllUsers, removeListenerForAllUsers } from '../../services/appUsersAPI';
import React, { useRef, useState, useEffect  } from "react";
import './appUsers.scss';
import { collection, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
import {User} from '../../types/types';
import { signInWithEmailAndPassword, Unsubscribe } from 'firebase/auth';
import {auth, db} from '../../firebase';
import { FirebaseError } from 'firebase/app';
import { authenticationTracker } from '../../services/authenticationSlice';

const usersCollectionRef = collection(db, "Users");

export function AppUsers()  {

    let isAdminUserLoggedIn = useSelector(authenticationTracker);

    //const [users, setUsers] = useState([]);
    const [users, setUsers] = useState<string[]>([]);

    const dispatch = useDispatch();// hooks

    const loggingOutAdminUser = async () => {
        
        try{
            await removeListenerForAllUsers();
            dispatch(setAuthentication(false));
            dispatch(changePageIndex(5));
            const i = await LogOutUser(); 
            //alert("Success logged in");
        }catch(error){
            //alert("Here:: " + error);
        } 



    }

    useEffect( () => {

        try{

            console.log("USE EFFECT");

            let allEmails : Array<string> =[];

            const subscribe = onSnapshot(usersCollectionRef, 
                
                (snapshot) => {

                    if(snapshot.docs.length > 0){
                        snapshot.docs.forEach((doc) => {
                        const email = doc.data().email;
                        allEmails.push(email);
                        //console.log(allEmails.length);
                        })

                        setUsers(allEmails);
                    }
                    else{

                        alert("Error");

                    }

                    
    
                },
                (error) => {
                    alert(error);
                },
                
            ); 

            //console.log("subscribe 1: " + subscribe);

            // remove listener when logging out
            if(isAdminUserLoggedIn === false){
                return subscribe(); // when you call this it stops listening
            }

        }catch(e){
            alert(e);
        }
        

        //console.log("subscribe 2: " + subscribe);

        // console.log("Use effect fired");


        // const getUsers = async () => {

        //     try{

                
        //         const emails = await listenerForAllUsers();
              
        //         console.log(emails.length);

        //         emails.forEach((data) => {
        //             console.log("got it" + data);
        //         })

        //         setUsers(emails);
                
        //     }catch(error){
        //         alert(error)
        //     }

            
            
        // }
    
        // try{
        //     getUsers();
        // }catch(error){
        //     alert(error);
        // }

       
    }, [isAdminUserLoggedIn])


    return(
        <div className='admin-users-container'>

            <div className='admin-users-emails'>

                 {/* <h1 onClick={loggingOutAdminUser} >Admin Login</h1> */}

                <ul className="grid_list">
                    {users && users.length > 0
                    ? users.map(( email , index) =>


                        <li className='grid-item' key={`${email}${index}`}>
                            
                            <p>{email}</p>
                            <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"></input>

                            
                        
                        
                        </li>
                    )
                    : null}
                </ul>


            </div>

            <div className='admin-users-send-emails'>

                <button type="button" onClick={loggingOutAdminUser}>Send emails!</button>

            </div>


        </div>
    )

}
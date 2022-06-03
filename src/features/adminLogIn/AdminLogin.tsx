import './adminLogin.scss';
import React, { useRef, useState, useEffect  } from "react";
import {firebase} from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';// hooks
import {logAdminUserInAuth, isUserLoggedIn} from './adminLoginSlice'; 
import {loggingAdminIn, retrieveUserId} from '../../services/authentication';
import { FirebaseError } from 'firebase/app';

export function AdminLogIn()  {

    useEffect( () => {
        checkedIfLoggedIn();
    }, [])

    const dispatch = useDispatch();// hooks
    let loggedIn = useSelector(isUserLoggedIn) // hooks

    const hasAdminUserLoggedIn = (adminLoggedIn : boolean) => {
        dispatch(logAdminUserInAuth(adminLoggedIn));
    }

    // check if user has already logged in after ui is set up -useEffect 
    const checkedIfLoggedIn = async () => {
        const userId = await retrieveUserId();
        if(userId.length === 0){
            alert("NOT logged in");
        }
        else{
            alert("Already logged in");
        }
    }



    const logAdminUserIn = async () => {
        console.log("Email: " + email);
        console.log("Password: " + password);

        isLoggingIn(true);


        try{
            const i = await loggingAdminIn(email, password); 
            const error = i as FirebaseError;
            
            if(error.code !== undefined){
                alert(error.code);
            }
            else{
                alert("Success logged in");
                hasAdminUserLoggedIn(true);
            }
            
            isLoggingIn(false);
        }catch(error){
            alert("Here:: " + error);
            isLoggingIn(false);
            hasAdminUserLoggedIn(false);
        } 



    }

    // set & get email
    const [email, setEmail] = useState("");

    function setEmailInput(event : any) {
        const input = (event.target as any).value;
        setEmail(input);
    }

    // set & get password
    const [password, setPassword] = useState("");

    function setPasswordInput(event : any) {
        const input = (event.target as any).value;
        setPassword(input);
    }

    // set & get password
    const [loggingIn, isLoggingIn] = useState(false);

    return(
        <div className='admin-login-container'>
            

            <div className='login-container'>

                <h1>Admin Login</h1>

                <p>Email</p>
                <input className='measurements input' type="email"  onChange={setEmailInput} value={email} />

                <p>Password</p>
                <input className='measurements input'  type="password" onChange={setPasswordInput} value={password} />

                {loggingIn === false && 

                    <button className='login-button measurements' onClick={logAdminUserIn}>Login</button>

                }

                {loggingIn === true && 
                    <div className="loader"></div>
                }
                
                

            </div>


        </div>
    )
}
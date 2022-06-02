import './adminLogin.scss';
import React, { useRef, useState, useEffect  } from "react";

export function AdminLogIn()  {

    const logAdminUserIn = () => {
        console.log("Email: " + email);
        console.log("Password: " + password);

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

    return(
        <div className='admin-login-container'>
            

            <div className='login-container'>

                <h1>Admin Login</h1>

                <p>Email</p>
                <input className='measurements input' type="email"  onChange={setEmailInput} value={email} />

                <p>Password</p>
                <input className='measurements input'  type="password" onChange={setPasswordInput} value={password} />

                <button className='login-button measurements' onClick={logAdminUserIn}>Login</button>

            </div>


        </div>
    )
}
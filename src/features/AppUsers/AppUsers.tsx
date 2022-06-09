import {loggingAdminIn, retrieveUserId, LogOutUser} from '../../services/authentication';
import { setAuthentication } from '../../services/authenticationSlice';
import {changePageIndex, tabTracker} from '../navigation/navigationSlice';
import { useSelector, useDispatch } from 'react-redux';// 
import { getAllUsers, listenerForAllUsers } from '../../services/appUsersAPI';
import React, { useRef, useState, useEffect  } from "react";
import './appUsers.scss';

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

    const sendEmails = async () => {
        // const emails = users; 

         // create reusable transporter object using the default SMTP transport
        // let transporter = nodemailer.createTransport({
        //     host: "smtp.ethereal.email",
        //     port: 587,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //     user: 'sanashee05@hotmail.com', // generated ethereal user
        //     pass: '#123Brouft05', // generated ethereal password
        //     },
        // });

        // // send mail with defined transport object
        // let info = await transporter.sendMail({
        //     from: '"Testing" <sanashee05@hotmail.com>', // sender address
        //     to: "sanashee05@hotmail.com, gareth.sanashee@apptaura.com", // list of receivers
        //     subject: "Hello ✔", // Subject line
        //     text: "Hello world?", // plain text body
        //     html: "<b>Hello world?</b>", // html body
        // });

        // console.log("Message sent: %s", info.messageId);

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
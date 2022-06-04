import {loggingAdminIn, retrieveUserId, LogOutUser} from '../../services/authentication';
import { setAuthentication } from '../../services/authenticationSlice';
import {changePageIndex, tabTracker} from '../navigation/navigationSlice';
import { useSelector, useDispatch } from 'react-redux';// hooks

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

    return(
        <div className='admin-login-container'>
            

            <div className='login-container'>

                <h1 onClick={loggingOutAdminUser} >Admin Login</h1>

                

                
                
                

            </div>


        </div>
    )

}
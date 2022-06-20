import {firebase} from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase';
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { async } from '@firebase/util';
import { getUser } from '../services/appUsersAPI';

export function getHedgesFromDatabase() {
    return ImagesForUI
  }
  
  const ImagesForUI = [
    { id: 123, name: 'Appleeeee', reduced: 40}
  ];

export async function LogOutUser() : Promise<boolean>{
    const signout = await getAuth().signOut();
    return true;
    console.log("user has signed out ");
  }

// Get the user Id for the currently logged in user.
export async function retrieveUserId(): Promise<string> {

    const currentUser =  getAuth().currentUser;
    if (currentUser !== null) {
        //alert("got user id");
        return currentUser.uid;
    }
    else {
        //alert("user id NULL");
        return ""
        //throw Error("User Id is null.");
    }
  }


export async function loggingAdminIn(email : string, password : string){
    try{

        const loggingIn = await signInWithEmailAndPassword(auth, email, password);
        const userId = loggingIn.user.uid;

        const checkUser = await checkUserType(userId);
        if(checkUser === true){
            return new Promise((resolve: Function) => { resolve(userId); });
        }
        else{

            await LogOutUser(); 

            return new Promise((resolve: Function) => {
                throw new Error("You are not an admin");
            });

        }

        

    }
    catch(error){

        //alert("FIREBASE FAILED: " + error + "Email: " + email);
        return new Promise((resolve: Function) => {
            const firebaseError = error as FirebaseError;
            throw new Error(firebaseError.message);
        });

    }
}

export async function checkUserType(userId : string) : Promise<boolean> {

    try{
      const result = await getUser(userId);
      alert("Got user ***");
      console.log("RESULT: " + result);
      return result; 
    }catch(error){
        throw Error("");
    }


}

import {firebase} from '../firebase';
import { signInWithEmailAndPassword, Unsubscribe } from 'firebase/auth';
import {auth, db} from '../firebase';
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { collection, getDocs, onSnapshot, doc, getDoc } from 'firebase/firestore';
import {User} from '../types/types';
import { Subscription  } from 'react-redux';

const usersCollectionRef = collection(db, "Users");

export async function getAllUsers() : Promise<string[]> {

    let allEmails : Array<string> =[];

    const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        
        data.docs.map((doc) => {

            const email = doc.data().email;
            allEmails.push(email);

        })

        return allEmails;
    }

    try{
        return getUsers();
    }catch(error){
        throw Error("");
    }

}


export async function getUser(userId : string)  : Promise<boolean>  {

    const getUsers = async () => {

        const userDocRef = doc(db, "Users", userId);

        const data = await getDoc(userDocRef);

        const result = data.data() as User;

        console.log("HEREEREREREEE");
        console.log(result.isAdmin);

        const isUserAdmin = result.isAdmin;

        if(isUserAdmin === true){
            return true;
        }
        else{
            return false;
        }

    }

    try{
        return getUsers();
    }catch(error){
        throw Error("");
    }

    
}


let subscription : Unsubscribe | null = null


export async function listenerForAllUsers() : Promise<string[]> {

    let allEmails : Array<string> =[];

    return new Promise((resolve, reject) => {
        const subscribe = onSnapshot(usersCollectionRef, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                const email = doc.data().email;
                allEmails.push(email);
                //console.log(allEmails.length);
            })

            resolve(allEmails);

            
            
        }); 

        //console.log("subscribe 1: " + subscribe);

        subscribe(); // when you call this it stops listening

        //console.log("subscribe 2: " + subscribe);

    })

    
}

export async function removeListenerForAllUsers() {
    try{
        if(subscription !== null){
            subscription();
            console.log("subscribe 2: " + subscription);
        }
       
    }catch(e){
        alert(e);
    }
    
}


import {firebase} from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth, db} from '../firebase';
import { FirebaseError } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';

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
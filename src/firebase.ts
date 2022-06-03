import * as firebase from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDlN7V3B3f_m8ZnT-jX79iAIRmXAOPXlJ0",
    authDomain: "hybrid-athlete-plan.firebaseapp.com",
    projectId: "hybrid-athlete-plan",
    storageBucket: "hybrid-athlete-plan.appspot.com",
    messagingSenderId: "224015852775",
    appId: "1:224015852775:web:b7b28c35067ce189a16e42",
    measurementId: "G-7YEGSPQMMB"
  };
  
 
  const app = firebase.initializeApp(firebaseConfig);

  export const auth = getAuth(app);

  export {firebase};
  
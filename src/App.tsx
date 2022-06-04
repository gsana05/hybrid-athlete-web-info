import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import { Welcome } from './features/welcome/Welcome';
import { Navigation } from './features/navigation/Navigation';
import { AboutMe } from './features/aboutMe/AboutMe';
import { HybridAthlete } from './features/hybridAthlete/HybridAthlete';
import { Programs } from './features/programs/Programs';
import { AdminLogIn } from './features/adminLogIn/AdminLogin';
import { AppUsers } from './features/AppUsers/AppUsers';
import {changePageIndex, tabTracker} from './features/navigation/navigationSlice';
import { authenticationTracker } from './services/authenticationSlice';
import { useSelector, useDispatch } from 'react-redux';// hooks 
import { useRef, useState, useEffect  } from "react";
import {loggingAdminIn, retrieveUserId} from './services/authentication';

function App() {

  let tabTrackerIndex = useSelector(tabTracker) // hooks
  let isAdminUserLoggedIn = useSelector(authenticationTracker);

  const [isLoggedIn, setisLoggedIn] = useState(false);

  return (
    <div className="App">

      <div className='navigation-container'>

        <Navigation/>

      </div>

      <div className='body-container'>

        {tabTrackerIndex === 1 && <Welcome/>}

        {tabTrackerIndex === 2 && <AboutMe/>}

        {tabTrackerIndex === 3 && <HybridAthlete/>}

        {tabTrackerIndex === 4 && <Programs/>}

        {tabTrackerIndex === 5 && <AdminLogIn/>}

        
        {isAdminUserLoggedIn === true && tabTrackerIndex === 6 && 
            <AppUsers/>
        }

      </div>

    </div>
  );
}

export default App;

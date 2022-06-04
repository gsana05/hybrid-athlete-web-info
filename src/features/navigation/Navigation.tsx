import './navigation.scss';
import { useSelector, useDispatch } from 'react-redux';// hooks 
//import logo from '../../logo.svg';
import logo from '../../hybridathletelogo.png';
import { useNavigate, useParams } from 'react-router-dom';
import {changePageIndex, tabTracker} from './navigationSlice';
import { setAuthentication } from '../../services/authenticationSlice';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import * as FaIcons from "react-icons/fa";
import {loggingAdminIn, retrieveUserId} from '../../services/authentication';


export function Navigation()  {


    const checkedIfLoggedIn = async () => {
        const userId = await retrieveUserId();
        if(userId.length === 0){
            //statements; 
            tabTrackerIndex = 5;
            changePageIndexTab(5);
            setAuthentication(false);
            dispatch(setAuthentication(false));
        }
        else{
            tabTrackerIndex = 6;
            changePageIndexTab(6);
            setAuthentication(true);
            dispatch(setAuthentication(true));
        }
    }

    let [isSmallScreen, setScreen] = useState(false); // deal with screen size for burger button under 1024 or above 
    let [isSideMenuOpen, setSideMenu] = useState(false); // hide and show side menu on small devices

    // listen to window size - we know when to change navbar to menu button
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
          function updateSize() {

            if(window.innerWidth < 1024){
                setScreen(true);
            }
            else{
                setScreen(false);
                setSideMenu(false); // close side bar when screen size is above 1024
            }

            
            setSize([window.innerWidth, window.innerHeight]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
      
  

    useWindowSize(); // call to set up window size listener 

    const dispatch = useDispatch();// hooks
    let tabTrackerIndex = useSelector(tabTracker) // hooks


    // when navigation tab has been selected this sets state 
    const changePageIndexTab = (value : number) => {
        dispatch(changePageIndex(value));
    }

    // show or hide sid emenu pop up 
    function setSideMenuPopUp(isOpen : boolean){
        setSideMenu(isOpen);
    }

    function changePage(type : Number){
        //window.alert(type); 

        switch(type) { 
            case 1: { 
               //statements; 
               tabTrackerIndex = 1;
               //window.alert("1");
               changePageIndexTab(1);
               break; 
            } 
            case 2: { 
               //statements; 
               tabTrackerIndex = 2;
               //window.alert("2");
               changePageIndexTab(2);
               break; 
            } 
            case 3: { 
                //statements; 
                tabTrackerIndex = 3;
                //window.alert("3");
                changePageIndexTab(3);
                break; 
             } 
             case 4: { 
                //statements; 
                tabTrackerIndex = 4;
                //window.alert("3");
                changePageIndexTab(4);
                break; 
             }
             case 5: { 

                checkedIfLoggedIn();
                
                break; 
             }  
            default: { 
               //statements; 
               break; 
            } 
         } 

    }

    return (


        <div className='navigation-container'>

            



            {isSmallScreen === true && 

            

                <div className='navigation-container'>

                    <h1 className='menu-icon'><FaIcons.FaBars onClick={() => setSideMenuPopUp(true) } /></h1>

                    {isSideMenuOpen === true && 

                        <div className='menu-pop-up'>

                            <div className='menu-pop-up-container'>

                                <div className='menu-pop-up-container-close'>

                                   <h1 className='menu-icon'><FaIcons.FaWindowClose onClick={() => setSideMenuPopUp(false) } /></h1>

                                </div>

                                <div className='menu-pop-up-container-heading'>

                                    <h2>HedgeDATE</h2>
                                    <h2>University of Surrey</h2>

                                    

                                </div>

                                <div className='menu-pop-up-container-tabs'>

                                    <button onClick={() => {changePage(1);  setSideMenu(true);}  }  className={`base-class ${tabTrackerIndex === 1 ?  'navigation-buttons-selected' : 'navigation-buttons' }`} type="button" >Hedges</button>
                                    <button onClick={() => {changePage(2);  setSideMenu(true);} }  className={`base-class ${tabTrackerIndex === 2 ?  'navigation-buttons-selected' : 'navigation-buttons' }`} type="button">Why Important</button>
                                    <button onClick={() => {changePage(3);  setSideMenu(true);} }  className={`base-class ${tabTrackerIndex === 3 ?  'navigation-buttons-selected' : 'navigation-buttons' }`} type="button">Pollution Calulator</button>

                                </div>


                            </div>

                            

                        </div>
                    
                    }
                    

                </div>

            }


            {isSmallScreen === false && 

                <div className='navigation-container'>

                    <div className='navigation-app-logo'>

                        {/* <img src={logo} className='app-icon-img'/> */}

                    </div>

                    <div className='navigation-tabs'>

                    <div className='navigation-pollution-calculator'>

                    <button onClick={() => changePage(1) }  className={`base-class ${tabTrackerIndex === 1 ?  'navigation-buttons-selected' : 'navigation-buttons' }`} type="button">Welcome</button>

                    </div>


                    <div className='navigation-hedges'>


                        <button onClick={() => changePage(2) }  className={`base-class ${tabTrackerIndex === 2 ?  'navigation-buttons-selected' : 'navigation-buttons' }`} type="button" >About me</button>

                    </div>

                    <div className='navigation-why-important'>

                        <button onClick={() => changePage(3) }  className={`base-class ${tabTrackerIndex === 3 ?  'navigation-buttons-selected' : 'navigation-buttons' }`} type="button">Hybrid Athlete</button>

                    </div>

                    <div className='navigation-pollution-calculator'>

                        <button onClick={() => changePage(4) }  className={`base-class ${tabTrackerIndex === 4 ?  'navigation-buttons-selected' : 'navigation-buttons' }`} type="button">Training programs</button>

                    </div>

                    <div className='navigation-pollution-calculator'>

                        <button onClick={() => changePage(5) }  className={`base-class ${tabTrackerIndex === 5 ?  'navigation-buttons-selected' : 'navigation-buttons' }`} type="button">Log in</button>

                    </div>


                    </div>


                    <div className='navigation-sponsor'>

                        <img src={logo} className='app-icon-img'/>

                    </div>

                    
                </div>

            
            
            }


        

        </div>
    );

  }

  export default Navigation; 
  
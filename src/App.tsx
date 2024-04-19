import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Styles
import './App.css'

// Constants
import { Routes as PageRoutes } from '@/utils/routes';
import { LocalStorageKeys } from '@/utils/constants';

// State manager
import { getUserToken } from '@/redux/user/selectors';
import { setCurrentToken } from '@/redux/user';

// Components
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Main from '@/pages/Main';
import WaitingRoom from '@/pages/WaitingRoom';
import CallRoom from '@/pages/CallRoom';

function App() {
  const userToken = useSelector(getUserToken);
  const dispatch = useDispatch();

  useEffect(()=>{
    const token = localStorage.getItem(LocalStorageKeys.token);

    if(!token) return;

    const parsedToken = JSON.parse(token);  
    dispatch(setCurrentToken(parsedToken));
  }, []);

  return (
    <Routes>
      {userToken ?
        <>
          <Route path={PageRoutes.default} element={ <Main/> }/>
          <Route path={PageRoutes.waitingRoom} element={ <WaitingRoom/> }/>
          <Route path={PageRoutes.waitingRoom} element={ <CallRoom/> }/>
        </>
      :
        <>
          {/* <Route path={PageRoutes.default} element={ <Navigate to={PageRoutes.login} /> }/> */}
          <Route path={PageRoutes.login} element={ <Login/> }/>
          <Route path={PageRoutes.register} element={ <Register/> }/>
        </>
      }
    </Routes>
  )
}

export default App

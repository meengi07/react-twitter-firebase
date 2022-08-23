import {React, useEffect, useState} from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import { updateCurrentUser,onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggIn, setIsLoggIn] = useState(authService.getUser);
  const [userObj, setUserObj] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if(user) {
        setIsLoggIn(true);
        setUserObj(user);
      } else {
        setIsLoggIn(false);
        setUserObj(null);
      } 
      setInit(true);
    });
  }, []);
  const refreshUser = async() => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  }
  
  return (
    <>
      {init ? (
      <AppRouter 
        refreshUser={refreshUser}
        isLoggIn={isLoggIn}
        user={userObj} />
      )
       : ("Initializing...")}
      <footer>&copy;  {new Date().getFullYear()} AllPrivate </footer>
    </>
  );
}

export default App;

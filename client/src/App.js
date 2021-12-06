//TODO: put a universal axios login in app.js to pretend like user is always logged in after refreshes
//because state is empty after each refresh, so instead of using localstorage, i use an axios login, and if the httpsonly cookie
//is still valid, the login request will execute correctly, if not, just load the "no-logged-in" user version
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react'
import HomePage from './components/pages/HomePage.component';
import Login from './components/pages/Login.component';
import NavBar from './components/pages/NavBar.component';
import Register from './components/pages/Register.component';
import Profile from './components/pages/Profile.component';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import './App.css'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loaderState, SetLoaderState] = useState(false)

  //re-auth function
  useEffect(() => {
    const automaticReauth = async () => {
      try {
        SetLoaderState(true)
        const response = await axios.post('/users/token')
        if (response.status === 200) {
          SetLoaderState(false)
          setLoggedInUser(response.data.user)
        }
      } catch (err) {
        SetLoaderState(false)
      }
    }
    automaticReauth();
  }, [])

  const recieveWhoLoggedIn = (userObj) => {
    setLoggedInUser(userObj);
  }
  const recieveLogout = async () => {
    try {
      const response = await axios.post('/users/logout');
      if (response.status === 200) {
        console.log('logout successful');
      }
      setLoggedInUser(null)
    }
    catch (err) {
      console.log(err);
    }
  }

  return (<BrowserRouter>
    <NavBar loggedInUser={loggedInUser} informLogout={recieveLogout} />
    {loaderState ?
      <Dimmer active>
        <Loader content='Loading' />
      </Dimmer>
      :
      <></>
    }
    <Routes>
      <Route exact path='/' element={<HomePage loggedInUser={loggedInUser} />} />
      <Route path='/login' element={<Login loggedInUser={loggedInUser} informLogin={recieveWhoLoggedIn} />} />
      <Route path='/register' element={<Register loggedInUser={loggedInUser} />} />
      <Route path='/profile' element={<Profile loggedInUser={loggedInUser} />} />
    </Routes>
  </BrowserRouter>);
}

export default App;

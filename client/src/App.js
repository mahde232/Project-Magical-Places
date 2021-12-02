import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage.component';
import Login from './components/pages/Login.component';
import Register from './components/pages/Register.component';

function App() {
  return (<BrowserRouter>
    <Routes>
      <Route exact path='/' element={<HomePage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  </BrowserRouter>);
}

export default App;

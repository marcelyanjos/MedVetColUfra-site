import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
// import Home from '../pages/home'
import Header from '../components/header'
import SignIn from '../pages/signin/index';

function Router() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to='/signin' />}/>
    <Route path="/signin" element={<SignIn />}/>
    <Route path="/main" element={<App/>}/>

  </Routes>
  </BrowserRouter>;
}

export default Router;
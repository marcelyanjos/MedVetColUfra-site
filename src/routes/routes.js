import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from '../App';
import Header from '../pages/home'
// import Header from '../components/header'
import Adocao from '../pages/pedidosadocao/index'
import Home from '../pages/home';
// import SignIn from '../pages/signin/index';

const Router = (
  <Routes>
    <Route index element={<Home />}/>
    <Route path="adocao" element={<Adocao/>}/>
  </Routes>

)

export default Router;
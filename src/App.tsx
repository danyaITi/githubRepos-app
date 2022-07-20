import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Favorites from './pages/favorites';
import Home from './pages/home'

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/fav' element={<Favorites/>}/>
      </Routes>
    </>
   
      
  )
}

export default App;

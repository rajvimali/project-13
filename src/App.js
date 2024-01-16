import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import User from './Components/User'
import AddPc from './Components/AddPc'
import AssignPc from './Components/AssignPc'
import Header from './Components/Header'
import Dashbord from './Components/Dashbord'
import Login from './Components/Login'
import Protected from './Components/Routes'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/dashbord" element={<Protected Component={Dashbord} />} />
          <Route path="/user" element={<Protected Component={User} />} />
          <Route path="/addpc" element={<Protected Component={AddPc} />} />
          <Route path="/assignpc" element={<Protected Component={AssignPc} />} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
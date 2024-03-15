import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login'
import SignUp from './components/Signup/Signup';


function App() {
  

  return (
    <>
      
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registrarse" element={<SignUp/>}/>

        
      </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App

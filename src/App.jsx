import { BrowserRouter, Route, Routes,Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import AnualChartsBalance from './components/TablaBalance/AnualChartsBalance';
import HomePage from "./pages/HomePage/HomePage";
import Instructivo from "./components/Instructivo/Instructivo";
import { useState,useEffect } from "react";
import { useUser } from './Context/UserContext';
import { UserProvider } from "./Context/UserContext";


function App() {
   

return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/registrarse" element={<SignUp />} />
          <Route path="/tabla_user" element={<Home />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/instructivo" element={<Instructivo />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
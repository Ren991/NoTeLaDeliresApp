//import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home/Home"
import HomePage from "./pages/HomePage/HomePage"
import Instructivo from "./components/Instructivo/Instructivo";
import NotFound from "./pages/NotFound/NotFound";
import { UserProvider,useUser } from "./Context/UserContext";
import { useEffect,useState } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Protected from "./components/Protected/Protected";


function App() {
  
    const router = createBrowserRouter([
      {
        path: '/',
        element: (     
            
              <HomePage />          
        ),
      },
      {
        path: '/tabla_user',
        element: (
          <Protected>            
              <Home />            
          </Protected>
        ),
      },
      {
        path: '/login',
        element: (       
            
          <Login />
          
        ),
      },
      {
        path: '/registrarse',
        element: (          
              <SignUp />         
        ),
      },
      {
        path: '/instructivo',
        element: (          
              <Instructivo />          
        ),
      },     
      {
        path: '*',
        element: (          
              <NotFound />          
        ),
      },     
  
    ])
  
    return <RouterProvider router={router} />
}

export default App;
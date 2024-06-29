//import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import Home from "./pages/Home/Home"
import HomePage from "./pages/HomePage/HomePage"
import Instructivo from "./components/Instructivo/Instructivo";
import { UserProvider,useUser } from "./Context/UserContext";
import { useEffect,useState } from "react";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Protected from "./components/Protected/Protected";


function App() {
  const { user} = useUser();
  


    {/* <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login />} />
          <Route path="/registrarse" element={<SignUp />} />
          <Route
            path="/tabla_user"
            element={ <Home /> }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/instructivo" element={<Instructivo />} />
          
        </Routes>
      </BrowserRouter>
    </UserProvider> */}
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
      
  
    ])
  
    return <RouterProvider router={router} />
}

export default App;
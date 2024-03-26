import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login'
import SignUp from './components/Signup/Signup';
import Home from './components/Home/Home';
import AnualChartsBalance from './components/TablaBalance/AnualChartsBalance';
import Acerca from "./components/Acerca/Acerca";


function App() {
  

  return (
    <>
      
      <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registrarse" element={<SignUp/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/anualCharts" element={<AnualChartsBalance/>}/>
        <Route path="/acerca" element={<Acerca/>}/>        
      </Routes>
      
    </BrowserRouter>
    </>
  )
}

export default App

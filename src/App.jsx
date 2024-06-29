import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login'
import SignUp from './components/Signup/Signup';
import Home from './components/Home/Home';
import HomePage from "./components/HomePage/HomePage";
import Instructivo from "./components/Instructivo/Instructivo";
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
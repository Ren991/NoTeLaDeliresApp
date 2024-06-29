import { useUser } from "../../Context/UserContext";
import { Navigate } from "react-router-dom"

const Protected = ({ children }) => {
    const {user} = useUser();
  
    if (!user) {
      return <Navigate to="/login" replace></Navigate>
    }
  
    return children
  }
  
  
  export default Protected
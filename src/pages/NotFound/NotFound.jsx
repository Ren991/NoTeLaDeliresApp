import "./NotFound.css"
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
  
    return(
        <>
           <div className="container">
      <div className="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div className="content">
        <h1 className="main-heading">Página no encontrada.</h1>
        <p>
          Tal vez la página que estás buscando no está disponible o nunca existió.
        </p>
        <a >
          <button onClick={()=> navigate("/")}> Volver al sitio<i className="far fa-hand-point-right"></i></button>
        </a>
      </div>
    </div>
        </>
    )
}

export default NotFound;
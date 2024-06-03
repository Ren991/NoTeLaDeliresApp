import Navbar from '../Navbar/Navbar'; 
import Footer from '../Footer/Footer'; 
import { Typography, Container, Button } from '@mui/material';
import { useNavigate  } from "react-router-dom";
import { useEffect } from 'react';
import { useUser } from '../../Context/UserContext';
import PropTypes from 'prop-types';




const HomePage = (onLogout) => {

    const navigate = useNavigate();
    const { user } = useUser();

   
 
    return (
        
        <div style={{ background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)', minHeight: '100vh', overflow: 'hidden' }}>
            <Navbar onLogout={onLogout}/>
            <Container style={{ textAlign: 'center', paddingTop: '100px',  color: '#fff', minHeight:"960px" }}>
                <Typography variant="h1" gutterBottom>
                    Gestiona tus finanzas
                </Typography>
                <Typography variant="h4" paragraph>
                    Toma el control de tu dinero y alcanza tus metas financieras
                </Typography>
                <Typography variant="body1" paragraph>
                    Nuestra aplicación te ayuda a administrar tus ingresos y gastos de manera eficiente.
                </Typography>
                {
                    user ?                 <Button onClick={()=>navigate("/tabla_user")} variant='outlined' style={{fontFamily:"courier", fontSize:"25px", marginTop:"25px"}}>Balance Mensual</Button>
                    :                 <Button onClick={()=>navigate("/login")} variant='outlined' style={{fontFamily:"courier", fontSize:"25px", marginTop:"25px"}}>Iniciar sesión</Button>

                }
                
            </Container>
            <Footer />
        </div>
        
    );
};



export default HomePage;

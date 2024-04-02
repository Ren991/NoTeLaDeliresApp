import Navbar from '../Navbar/Navbar'; 
import Footer from '../Footer/Footer'; 
import { Typography, Container, Button } from '@mui/material';

const HomePage = () => {
    return (
        
        <div style={{ background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)', minHeight: '100vh', overflow: 'hidden' }}>
            <Navbar />
            <Container style={{ textAlign: 'center', paddingTop: '100px', paddingBottom: '100px', color: '#fff', minHeight:"650px" }}>
                <Typography variant="h1" gutterBottom>
                    Gestiona tus finanzas
                </Typography>
                <Typography variant="h4" paragraph>
                    Toma el control de tu dinero y alcanza tus metas financieras
                </Typography>
                <Typography variant="body1" paragraph>
                    Nuestra aplicación te ayuda a administrar tus ingresos y gastos de manera eficiente.
                </Typography>
                <Button variant='outlined' style={{fontFamily:"courier", fontSize:"25px", marginTop:"25px"}}>Iniciar sesión</Button>
                
            </Container>
            <Footer />
        </div>
        
    );
};

export default HomePage;

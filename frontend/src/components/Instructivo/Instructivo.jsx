import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const Instructivo = () =>{
    return (
        <>
            <Navbar/>
                <div style={{marginTop: "100px"}}>
                    <Paper elevation={3} style={{ padding: '20px', maxWidth: '80%', margin: 'auto', marginTop: '50px' ,}}>
                        <Typography variant="h3" gutterBottom>
                            Instrucciones de la Aplicación
                        </Typography>
                            <Box marginBottom={2}>
                                <Typography variant="body1">
                                ¡Bienvenido a nuestra aplicación!
                                </Typography>
                                <Typography variant="body1">
                                Aquí están las instrucciones para comenzar:
                                </Typography>
                            </Box>
                            <Box marginBottom={2}>
                                <Typography variant="h6">
                                1. Paso uno
                                </Typography>
                                <Typography variant="body1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur lectus eu sollicitudin dapibus.
                                </Typography>
                            </Box>
                            <Box marginBottom={2}>
                                <Typography variant="h6">
                                2. Paso dos
                                </Typography>
                                <Typography variant="body1">
                                Fusce sed ante vitae sapien fringilla euismod. Etiam nec est ut nulla finibus iaculis a a risus.
                                </Typography>
                            </Box>
                            <Box marginBottom={2}>
                                <Typography variant="h6">
                                3. Paso tres
                                </Typography>
                                <Typography variant="body1">
                                Nulla facilisi. Nulla facilisi. Nullam tincidunt libero in magna pulvinar, vitae tempus sapien condimentum.
                                </Typography>
                            </Box>
                            <Box marginBottom={2}>
                                <Typography variant="body1">
                                ¡Listo! Ahora estás listo para comenzar a usar nuestra aplicación. Si necesitas ayuda adicional, no dudes en contactarnos.
                                </Typography>
                            </Box>
                        </Paper>
                </div>
            
            <Footer/>
        
        </>
    )
}
export default Instructivo
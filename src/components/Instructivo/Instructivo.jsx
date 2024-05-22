import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Instructivo = () => {
    const FunctionalitiesCard = ({ title, description, image }) => {
        return (
          <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
            <img src={image} alt={title} style={{ width: '100%', marginBottom: '10px' }} />
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
          </Paper>
        );
      };
      
      const functionalities = [
        {
          title: 'Modificar valores',
          description: 'Puedes modificar los valores de tus transacciones y categorías en cualquier momento.',
          image: 'https://i2.wp.com/www.grandesenlosdeportes.com/wp-content/uploads/2023/08/Leo-Mesi.jpg?w=1024&ssl=1'        },
        {
          title: 'Añadir categorías',
          description: 'Si necesitas agregar nuevas categorías para organizar tus transacciones, puedes hacerlo fácilmente.',
          image: 'https://i2.wp.com/www.grandesenlosdeportes.com/wp-content/uploads/2023/08/Leo-Mesi.jpg?w=1024&ssl=1'       },
        {
          title: 'Eliminar categorías',
          description: 'También puedes eliminar categorías que ya no necesites.',
          image: 'https://i2.wp.com/www.grandesenlosdeportes.com/wp-content/uploads/2023/08/Leo-Mesi.jpg?w=1024&ssl=1'
        },
        {
          title: 'Editar categorías',
          description: 'Si deseas cambiar el nombre o algún otro detalle de una categoría existente, eso también es posible.',
          image: 'https://i2.wp.com/www.grandesenlosdeportes.com/wp-content/uploads/2023/08/Leo-Mesi.jpg?w=1024&ssl=1'        },
        {
          title: 'Ver gráficos mensuales y anuales',
          description: 'Puedes visualizar tus gastos mensuales y anuales en forma de gráficos para un análisis más detallado.',
          image: 'https://i2.wp.com/www.grandesenlosdeportes.com/wp-content/uploads/2023/08/Leo-Mesi.jpg?w=1024&ssl=1'      },
        {
          title: 'Exportar a Excel',
          description: 'Por último, puedes exportar tus datos a un archivo Excel para un uso adicional o para compartirlos con otros.',
          image: 'https://i2.wp.com/www.grandesenlosdeportes.com/wp-content/uploads/2023/08/Leo-Mesi.jpg?w=1024&ssl=1'
        }
      ];

    return (
        <>
            <Navbar />
            <div style={{marginTop: "100px"}}>
                <Paper elevation={3} style={{ padding: '20px', maxWidth: '70%', margin: 'auto', marginTop: '50px' }}>
                    <Typography variant="h4" gutterBottom>
                        Instrucciones de la Aplicación
                    </Typography>
                    <Box marginBottom={2}>
                        <Typography variant="body1">
                            ¡Bienvenido a nuestra aplicación!
                        </Typography>
                        <Typography variant="body1">
                            Aquí hay una lista de las cosas que puedes hacer:
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {functionalities.map((func, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <FunctionalitiesCard title={func.title} description={func.description} image={func.image} />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </div>
            <Footer />
        </>
    );
};

export default Instructivo;

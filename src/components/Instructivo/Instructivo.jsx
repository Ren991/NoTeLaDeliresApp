import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Instructivo = () => {
    const FunctionalitiesCard = ({ title, description, images }) => {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
        };

        return (
            <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image.src} alt={`${title} ${index + 1}`} style={{  marginBottom: '10px',width: '100%', height: '300px', objectFit: 'cover'  }}  />
                            <h3>{image.instruction}</h3>
                        </div>
                    ))}
                </Slider>
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
            images: [
                { src: '/imagenes/ModificarValor1.jpeg', instruction: 'Paso 1: Ve hacia el mes donde desea modificar valores. Luego presiona el ícono con forma de lapiz.' },
                { src: '/imagenes/ModificarValor2.jpeg', instruction: 'Paso 2: Modifica el valor de las categorías deseadas.' },
                { src: '/imagenes/ModificarValor3.jpeg', instruction: 'Paso 3: Haz click en el ícono de lapiz en el mes donde se editaron los valores' }
            ]
        },
        {
            title: 'Añadir categorías',
            description: 'Si necesitas agregar nuevas categorías para organizar tus transacciones, puedes hacerlo fácilmente.',
            images: [
                { src: '/imagenes/AñadirCategoria1.jpeg', instruction: 'Paso 1: Haz click sobre el botón "+" ubicado a la izquierda de Categorías.' },
                { src: '/imagenes/AñadirCategoria2.jpeg', instruction: 'Paso 2: Ingresa el nombre de la nueva categoría. Luego clickear sobre el botón "Guardar" ' },
                
            ]
        },
        {
            title: 'Eliminar categorías',
            description: 'También puedes eliminar categorías que ya no necesites.',
            images: [
                { src: '/imagenes/EliminarCategoria1.jpeg', instruction: 'Paso 1: Haz click sobre el botón rojo a la izquierda de la categoría que desea eliminar.' },
                { src: '/imagenes/EliminarCategoria2.jpeg', instruction: 'Paso 2: Clickear sobre el botón "si, eliminar".' }
               
            ]
        },
        {
            title: 'Editar nombre de categorías',
            description: 'Si deseas cambiar el nombre de una categoría existente, eso también es posible.',
            images: [
                { src: '/imagenes/EditarCategoria1.jpeg', instruction: 'Paso 1: Haz click sobre el lapiz de la categoría a editar.' },
                { src: '/imagenes/EditarCategoria2.jpeg', instruction: 'Paso 2: Ingrese el nuevo nombre de la categoría.' },
                { src: '/imagenes/EditarCategoria3.jpeg', instruction: 'Paso 3: Se actualizará el nombre.' }
            ]
        },
        {
            title: 'Ver gráficos mensuales y anuales',
            description: 'Puedes visualizar tus gastos mensuales y anuales en forma de gráficos para un análisis más detallado.',
            images: [
                { src: '/imagenes/MostrarGrafico1.jpeg', instruction: 'Paso 1: Dirígete hacia la sección clickeando el botón "Mostrar Gráficos".' },
                { src: '/imagenes/MostrarGrafico2.jpeg', instruction: 'Paso 2: Visualiza los datos.' }
            ]
        },
        {
            title: 'Exportar a Excel',
            description: 'Por último, puedes exportar tus datos a un archivo Excel para un uso adicional o para compartirlos con otros.',
            images: [
                { src: '/imagenes/ExportarExcel1.jpeg', instruction: 'Paso 1: Al hacer click sobre el boton "Exportar a Excel" se descargará el archivo.' },
                { src: '/imagenes/ExportarExcel3.jpeg', instruction: 'Paso 2: Listo! Ya tienes el balance en formato .xlsx .' }
            ]
        }
    ];

    return (
        <div style={{ background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)' }}>
            <Navbar />
            <div style={{ marginTop: "100px" }}>
                <Paper elevation={3} style={{ background: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)', color: "white", padding: '20px', maxWidth: '70%', margin: 'auto', marginTop: '50px' }}>
                    <Typography variant="h3" gutterBottom>
                        Instrucciones de la Aplicación
                    </Typography>
                    <Box marginBottom={2}>
                       
                        <Typography variant="body1">
                            Aquí hay una lista de las cosas que puedes hacer:
                        </Typography>
                    </Box>
                    <Grid container spacing={2}>
                        {functionalities.map((func, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <FunctionalitiesCard title={func.title} description={func.description} images={func.images} />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </div>
            <Footer />
        </div>
    );
};

export default Instructivo;

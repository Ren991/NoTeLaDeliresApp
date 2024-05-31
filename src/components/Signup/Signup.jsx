import { useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate  } from "react-router-dom";
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'
import { db } from '../Services/Service';
import { useUser } from '../../Context/UserContext';



const defaultTheme = createTheme();

export default function SignUp() {


  const navigate = useNavigate();
  const { user } = useUser();


  const auth = getAuth();



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("firstName"));
    console.log(data.get("lastName"));
    console.log(data.get("email"));
    const email = data.get("email");
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const password = data.get("password");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      const user = userCredential.user;
      console.log(user);
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
          nombre:data.get("firstName"),
          apellido:data.get("lastName"),
          email:data.get("email"),
         
          balance: [
            {
              "data": [
                {
                  "category": "Alquiler",
                  "expenses": [
                    { "month": "Enero", "amount": 0 },
                    { "month": "Febrero", "amount": 0 },
                    { "month": "Marzo", "amount": 0 },
                    { "month": "Abril", "amount": 0 },
                    { "month": "Mayo", "amount": 0 },
                    { "month": "Junio", "amount": 0 },
                    { "month": "Julio", "amount": 0 },
                    { "month": "Agosto", "amount": 0 },
                    { "month": "Septiembre", "amount": 0 },
                    { "month": "Octubre", "amount": 0 },
                    { "month": "Noviembre", "amount": 0 },
                    { "month": "Diciembre", "amount": 0 }
                  ]
                },
                {
                  "category": "Salidas",
                  "expenses": [
                    { "month": "Enero", "amount": 0 },
                    { "month": "Febrero", "amount": 0 },
                    { "month": "Marzo", "amount": 0 },
                    { "month": "Abril", "amount": 0 },
                    { "month": "Mayo", "amount": 0 },
                    { "month": "Junio", "amount": 0 },
                    { "month": "Julio", "amount": 0 },
                    { "month": "Agosto", "amount": 0 },
                    { "month": "Septiembre", "amount": 0 },
                    { "month": "Octubre", "amount": 0 },
                    { "month": "Noviembre", "amount": 0 },
                    { "month": "Diciembre", "amount": 0 }
                  ]
                },
                {
                  "category": "Comida",
                  "expenses": [
                    { "month": "Enero", "amount": 0 },
                    { "month": "Febrero", "amount": 0 },
                    { "month": "Marzo", "amount": 0 },
                    { "month": "Abril", "amount": 0 },
                    { "month": "Mayo", "amount": 0 },
                    { "month": "Junio", "amount": 0 },
                    { "month": "Julio", "amount": 0 },
                    { "month": "Agosto", "amount": 0 },
                    { "month": "Septiembre", "amount": 0 },
                    { "month": "Octubre", "amount": 0 },
                    { "month": "Noviembre", "amount": 0 },
                    { "month": "Diciembre", "amount": 0 }
                  ]
                },
                {
                  "category": "Servicios",
                  "expenses": [
                    { "month": "Enero", "amount": 0 },
                    { "month": "Febrero", "amount": 0 },
                    { "month": "Marzo", "amount": 0 },
                    { "month": "Abril", "amount": 0 },
                    { "month": "Mayo", "amount": 0 },
                    { "month": "Junio", "amount": 0 },
                    { "month": "Julio", "amount": 0 },
                    { "month": "Agosto", "amount": 0 },
                    { "month": "Septiembre", "amount": 0 },
                    { "month": "Octubre", "amount": 0 },
                    { "month": "Noviembre", "amount": 0 },
                    { "month": "Diciembre", "amount": 0 }
                  ]
                },
                {
                  "category": "Tarjeta de crédito",
                  "expenses": [
                    { "month": "Enero", "amount": 0 },
                    { "month": "Febrero", "amount": 0 },
                    { "month": "Marzo", "amount": 0 },
                    { "month": "Abril", "amount": 0 },
                    { "month": "Mayo", "amount": 0 },
                    { "month": "Junio", "amount": 0 },
                    { "month": "Julio", "amount": 0 },
                    { "month": "Agosto", "amount": 0 },
                    { "month": "Septiembre", "amount": 0 },
                    { "month": "Octubre", "amount": 0 },
                    { "month": "Noviembre", "amount": 0 },
                    { "month": "Diciembre", "amount": 0 }
                  ]
                },
                {
                  "category": "Inversiones",
                  "expenses": [
                    { "month": "Enero", "amount": 0 },
                    { "month": "Febrero", "amount": 0 },
                    { "month": "Marzo", "amount": 0 },
                    { "month": "Abril", "amount": 0 },
                    { "month": "Mayo", "amount": 0 },
                    { "month": "Junio", "amount": 0 },
                    { "month": "Julio", "amount": 0 },
                    { "month": "Agosto", "amount": 0 },
                    { "month": "Septiembre", "amount": 0 },
                    { "month": "Octubre", "amount": 0 },
                    { "month": "Noviembre", "amount": 0 },
                    { "month": "Diciembre", "amount": 0 }
                  ]
                },
                {
                  "category": "INGRESOS",
                  "expenses": [
                    { "month": "Enero", "amount": 0 },
                    { "month": "Febrero", "amount": 0 },
                    { "month": "Marzo", "amount": 0 },
                    { "month": "Abril", "amount": 0 },
                    { "month": "Mayo", "amount": 0 },
                    { "month": "Junio", "amount": 0 },
                    { "month": "Julio", "amount": 0 },
                    { "month": "Agosto", "amount": 0 },
                    { "month": "Septiembre", "amount": 0 },
                    { "month": "Octubre", "amount": 0 },
                    { "month": "Noviembre", "amount": 0 },
                    { "month": "Diciembre", "amount": 0 }
                  ]
                }
          
              ]
            }
          ] //para guardar los balances.
      });

      
      navigate(("/login"));
  } catch (error) {
      console.error('Error signing up:', error);
      Swal.fire({
          title: 'Error!',
          text: 'Error al registrarse, intentente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Salir'
        })
  }
  };

  useEffect(() => {
    if (user !== null) {
     navigate("/tabla_user")
    }
  }, [user]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}} >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse en NoTeLaDeliresApp
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="Nombre" autoFocus/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link href="#" variant="body2" onClick={()=> navigate("/login")}>
                  Ya tiene una cuenta? Iniciar sesión
                </Link>
              </Grid>
              <Grid item >
                  <Link href="#" variant="body2" onClick={()=> navigate("/")}>
                    Menu principal
                  </Link>
                </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}
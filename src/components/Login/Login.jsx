import {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate  } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth,db} from "../Services/Service";
import { doc, getDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useUser } from '../../Context/UserContext';




const defaultTheme = createTheme();

export default function Login() {


  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const { signIn } = useUser();
  const {user} = useUser();


  useEffect(() => {
    if (user !== null) {
     navigate("/tabla_user")
    }
  }, [user]);

  const NavHome =()=>{
    navigate("/tabla_user");
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get("password");
  
    setLoading(true); // Mostrar Backdrop
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const token = await user.getIdToken();
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('id', user.uid); 
  
        // Verificar si balanceAnual existe y no está vacío
        const balanceAnual = userData.balance && userData.balance.length > 0 ? userData.balance : [];
        const dataUser = { email, token: token, balanceAnual: balanceAnual, id: user.uid };
  
        signIn(dataUser);
        NavHome();
        setLoading(false); // Ocultar Backdrop
      } else {
        setLoading(false); // Ocultar Backdrop
  
        Swal.fire({
          title: 'Error!',
          text: 'Credenciales Inválidas',
          icon: 'error',
          confirmButtonText: 'Salir'
        });
      }
    } catch (err) {
      setLoading(false); // Ocultar Backdrop
  
      Swal.fire({
        title: 'Error!',
        text: 'Credenciales Inválidas',
        icon: 'error',
        confirmButtonText: 'Salir'
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://www.corporacionbi.com/gt/financieraindustrial/wp-content/uploads/2023/01/banner-ef-balance-general-condensado-mensual.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={()=> navigate("/")}>
                    Menu principal
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={()=> navigate("/registrarse")}>
                    {"No tienes cuenta? Registrarse"}
                  </Link>
                </Grid>
              </Grid>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
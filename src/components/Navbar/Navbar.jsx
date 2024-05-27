
import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate  } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';


const drawerWidth = 240;
const navItems = ["Salir","Instructivo"];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    

    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);

  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        No te la delires App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleNavItemClick = (item) => {
    if (item === "Salir") {
      handleLogout(); // Navegar a la ruta de logout
    } else if (item === "Instructivo") {
      navigate('/instructivo');  // Navegar a la ruta de instructivo
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logout exitoso");
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/'); // Redirigir a la página de inicio de sesión
    } catch (error) {
      console.error("Error cerrando sesión:", error);
    }
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ background: '#27342F' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{cursor:"pointer"}}
            onClick={()=>navigate("/")}
            
          >
             No te la delires App
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems
                .filter(item => item !== "Salir" || isAuthenticated)
                .map((item) => (
                  <Button key={item} sx={{ color: '#fff' }} onClick={() => handleNavItemClick(item)}>
                    {item}
                  </Button>
                ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>      
    </Box>
  );
}

Navbar.propTypes = {
 
  window: PropTypes.func,
};

export default Navbar;
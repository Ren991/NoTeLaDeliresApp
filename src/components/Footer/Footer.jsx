import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Footer = () => {
  return (
    <footer style={{  color: '#ffffff', padding: '48px 0', marginTop: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              ¡Gracias por visitar nuestra aplicación!
            </Typography>
            <Typography variant="body1">
              No Te La Delires App. Todos los derechos reservados.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Enlaces útiles:</Typography>
            <Typography variant="body1">
              <Link target="_blank" color="inherit" href="https://www.linkedin.com/in/renzo-beccari/" style={{textDecoration:"none"}}>
                <LinkedInIcon/> Linkedin
                
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link  target="_blank" color="inherit" href="https://github.com/Ren991"  style={{textDecoration:"none"}}>
                <GitHubIcon/> Github
              </Link>
            </Typography>
            <Typography variant="body1">
              <Link target="_blank" color="inherit" href="mailto:beccrenzo@gmail.com" style={{textDecoration:"none"}}>
                <MailOutlineIcon/> Mail
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
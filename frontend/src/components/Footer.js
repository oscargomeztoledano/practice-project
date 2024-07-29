import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        /**TODO poner un link */
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" target="_blank"
            rel="noopener noreferrer" href="">  
          link to website 
        </Link>{' '} 
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  function Footer() {
    return (
      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            {'Prácticas HPECDS'}
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            {'Trabajo realizado por Óscar Gómez.'}
          </Typography>
          <Copyright />
        </Container>
      </Box>
    );
  }
  
  
  
  export default Footer;
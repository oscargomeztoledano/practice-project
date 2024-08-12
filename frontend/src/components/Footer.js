import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import Stack from '@mui/material/Stack';


function Copyright() {
    return (
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
    const social = 
    [
      { name: 'GitHub', icon: GitHubIcon,url:'https://github.com/oscargomeztoledano/practice-project/tree/main/frontend'},
      { name: 'X', icon: XIcon, url:'https://twitter.com/?lang=es' },
      { name: 'Facebook', icon: FacebookIcon, url:'https://www.facebook.com/' },
    ];
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
          <Stack
            direction="row"
            spacing={2}  
            justifyContent="center" 
            sx={{ mt: 2 }} 
          >
            {social.map((item) => (
              <Link
                display="flex"
                alignItems="center"
                href={item.url}
                key={item.name}
                color="text.secondary"
                sx={{ mb: 0.5 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <item.icon />
              </Link>
            ))}
          </Stack>
              <Copyright />
        </Container>
      </Box>
    );
  }
  
  
  
  export default Footer;
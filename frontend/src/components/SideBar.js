import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

function Sidebar() {
  const social = 
    [
      { name: 'GitHub', icon: GitHubIcon,url:'https://github.com/oscargomeztoledano/practice-project/tree/main/frontend'},
      { name: 'X', icon: XIcon, url:'https://twitter.com/?lang=es' },
      { name: 'Facebook', icon: FacebookIcon, url:'https://www.facebook.com/' },
    ];
  
  const paginas = [{name: 'Jugadores', url: '/home/jugadores'}, {name: 'Equipos', url: '/home/equipos'}, {name: 'Partidos', url: '/home/partidos'}, {name: 'Grupos', url: '/home/grupos'}];

  return (
    <Grid item xs={12} md={4}>
        <Typography variant="h6" gutterBottom>
            Enlaces
        </Typography>
        {paginas.map((pagina) => (
            <Link
                display="block"
                variant="body1"
                href={pagina.url}
                key={pagina.name}
                sx={{ mb: 0.5 }}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <span>{pagina.name}</span>
                </Stack>
            </Link>
        ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Redes sociales
      </Typography>
      {social.map((item) => (
        <Link
          display="block"
          variant="body1"
          href={item.url}
          key={item.name}
          sx={{ mb: 0.5 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <item.icon />
            <span>{item.name}</span>
          </Stack>
        </Link>
      ))}
    </Grid>
  );
}



export default Sidebar;

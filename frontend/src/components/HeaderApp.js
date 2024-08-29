import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import './HeaderApp.css';
import Login from './Login';
import Logout from './Logout';

const sections = [
    { title: 'Teams', url: '/teams' },
    { title: 'Players', url: '/players' },
    { title: 'Matches', url: '/matches' },
    { title: 'Groups', url: '/groups' }
];

export default function HeaderApp() {
    
    return (
        <div>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    {sessionStorage.getItem('email') ? (
                        <span>{sessionStorage.getItem('name')}</span>
                    ) : (
                        <span>&nbsp;</span> // Espacio vacío cuando no hay sesión iniciada
                    )}
                </div>
                <Typography component="h2" variant='h5' color="inherit" align="center" noWrap>
                    <Link href='/' color="inherit">
                        Euro 2024
                    </Link>
                </Typography>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    {sessionStorage.getItem('email') ? (
                        <Logout/>
                    ) : (
                        <Login/>
                    )}
                </div>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {sections.map((section) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </div>
    );
}
import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import './HeaderApp.css';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const sections = [
    { title: 'Equipos', url: '/teams' },
    { title: 'Jugadores', url: '/players' },
    { title: 'Partidos', url: '/matches' },
    { title: 'Grupos', url: '/groups' }
];

export default function HeaderApp() {
    const navigate = useNavigate();

    const onSuccess=(res)=>{
        var email=jwtDecode(res.credential).email;
        var name=jwtDecode(res.credential).name;
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('name', name);
        navigate("/");
    }
    const onError=()=>{
        console.log("error");
    }
    const onLogout=()=>{
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('name');
        googleLogout();
        navigate("/");
    }
    
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
                        Eurocopa 2024
                    </Link>
                </Typography>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    {sessionStorage.getItem('email') ? (
                        <Button color="primary" variant="outlined" onClick={onLogout}>
                            Logout
                        </Button>
                    ) : (
                        <GoogleOAuthProvider clientId={"1058550104105-b4j0rieb86umhbsf56toilefrb6j4mp8.apps.googleusercontent.com"}>
                            <GoogleLogin
                                onSuccess={onSuccess}
                                onError={onError}
                            />
                        </GoogleOAuthProvider>
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
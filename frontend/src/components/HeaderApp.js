import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand,
  } from 'reactstrap';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import config from '../config';



export default function HeaderApp() {
    const navigate = useNavigate();

    const onSuccess=(res)=>{
        var email=jwtDecode(res.credential).email;
        var name=jwtDecode(res.credential).name;
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('name', name);
        navigate("/home");
    }
    const onError=()=>{
        console.log("error");
    }
    const onLogout=()=>{
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('name');
        googleLogout();
        navigate("/home");
    }
    
    return (
        <Navbar color="secondary" light={true} dark={true} expand={true} fixed="top" container="fluid">
            <NavbarBrand href="/home">EURO 2024</NavbarBrand>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/home/jugadores">Jugadores</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/home/equipos">Equipos</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/home/partidos">Partidos</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/home/grupos">Grupos</NavLink>
                </NavItem>
            </Nav>
            <Nav className="mr-auto" navbar>
                {sessionStorage.getItem('email') ? (
                    <NavItem>
                        <Button variant="outlined" size="small" onClick={onLogout}>
                            Cerrar sesión
                        </Button>
                        <Typography variant="body1" color="inherit">
                            {sessionStorage.getItem('name')+" "}
                        </Typography>
                        
                    </NavItem>
                    
                ) : (
                    <NavItem>
                        <GoogleOAuthProvider clientId={config.clientID}>
                            <GoogleLogin onSuccess={onSuccess} onError={onError} />
                        </GoogleOAuthProvider>
                    </NavItem>
                )}
            </Nav>
        </Navbar>
    );
}
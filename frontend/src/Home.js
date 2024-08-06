import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import HeaderApp from './components/HeaderApp';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import Carousel from './components/Carousel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cardgroup from './components/CardGroup'; // comentado para realizar las pruebas sin el backend

const defaultTheme = createTheme();
export default function Home() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <HeaderApp/>
                <Divider/>
                <main>
                <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Carousel />
                        </Grid>
                        <Grid item xs={12} sm={11}>
                            {<Cardgroup/> } {/* comentado para realizar las pruebas sin el backend */}
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Sidebar />
                        </Grid>
                </Grid>
                </main>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
}
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import HeaderApp from './components/HeaderApp';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cardgroup from './components/CardGroup'; 

const defaultTheme = createTheme();
export default function Home() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <HeaderApp/>
                <main>
                <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Carousel />
                        </Grid>
                        <Divider/>
                        <Grid item xs={12}>
                            {<Cardgroup/> } 
                        </Grid>
                </Grid>
                </main>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
}
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import HeaderApp from '../HeaderApp';
import Footer from '../Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from './tablePlayers';
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
                            <Typography variant="h1">Players of Euro2024</Typography>
                            <Typography variant="body1">On this page you can see the information of the different Players participating in Euro 2024.</Typography>
                        </Grid>
                        <Divider/>
                        <Grid item xs={12}>
                            {<Table/> } 
                        </Grid>
                    </Grid>
                </main>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
}
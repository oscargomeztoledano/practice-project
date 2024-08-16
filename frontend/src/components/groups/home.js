import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import HeaderApp from '../HeaderApp';
import Footer from '../Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from './tableGroups';
import { getAllGroups } from '../../utils/apiCalls';
const defaultTheme = createTheme();

export default function Home() {
    const [groups, setGroups] = useState([]);

    // Fetch all groups when the component mounts
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const data = await getAllGroups();
                setGroups(data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, [])
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <HeaderApp/>
                <main>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h1">Groups of Euro2024</Typography>
                            <Typography variant="body1">On this page you can see the information of the groups phase in Euro 2024.</Typography>
                        </Grid>
                        <Divider/>
                        <Grid item xs={12}>
                            {groups.length > 0 ? (
                                groups.map(group => (
                                    <div key={group._id}>
                                        <Typography variant="h2">Group {group.name}</Typography>
                                        <Table teams={group.teams} />
                                        <Divider/>
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body1">Loading groups...</Typography>
                            )}
                        </Grid>
                    </Grid>
                </main>
            </Container>
            <Footer/>
        </ThemeProvider>
    );
}
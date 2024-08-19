import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import HeaderApp from '../HeaderApp';
import Footer from '../Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from './tableMatches';
import { getAllMatches } from '../../utils/apiCalls';

const defaultTheme = createTheme();

// Función para agrupar los partidos por descripción o por fase
const groupMatches = (matches) => {
    return matches.reduce((groups, match) => {
        const { stage, description } = match;
        let groupKey;

        if (stage === 'groupStage') {
            // Extraer el grupo de la descripción, por ejemplo, "Group A"
            groupKey = description;
        } else {
            // Convertir el stage en la fase correspondiente
            switch (stage) {
                case 'roundOfSixteen':
                    groupKey = 'Round of Sixteen';
                    break;
                case 'quarterFinal':
                    groupKey = 'Quarter Final';
                    break;
                case 'semiFinal':
                    groupKey = 'Semi Final';
                    break;
                case 'final':
                    groupKey = 'Final';
                    break;
                default:
                    groupKey = 'Other';
            }
        }

        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(match);
        return groups;
    }, {});
};

export default function Home() {
    const [matches, setMatches] = useState([]);

    // Fetch all matches when the component mounts
    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await getAllMatches();
                setMatches(data);
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, []);

    // Agrupar los partidos por grupo o fase
    console.log(matches);
    const groupedMatches = groupMatches(matches);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <HeaderApp />
                <main>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h1">Matches of Euro2024</Typography>
                            <Typography variant="body1">
                                On this page you can see the information of the matches in Euro 2024.
                            </Typography>
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            {Object.keys(groupedMatches).length > 0 ? (
                                Object.keys(groupedMatches).map(groupKey => (
                                    <div key={groupKey}>
                                        <Typography variant="h2">{groupKey}</Typography>
                                        {/* Pasa el grupo completo de partidos a TableMatches */}
                                        <Table matches={groupedMatches[groupKey]} />
                                        <Divider />
                                    </div>
                                ))
                            ) : (
                                <Typography variant="body1">Loading matches...</Typography>
                            )}
                        </Grid>
                    </Grid>
                </main>
            </Container>
            <Footer />
        </ThemeProvider>
    );
}

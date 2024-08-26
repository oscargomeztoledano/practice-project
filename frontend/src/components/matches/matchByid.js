import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getTeambyId, getMatchbyId } from '../../utils/apiCalls';
import Spinner from 'react-bootstrap/Spinner';  
import Typography from '@mui/material/Typography';
import { Container, CssBaseline, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import HeaderApp from '../HeaderApp';
import Footer from '../Footer';
import InfoEquipos from './infoEquipos';

const defaultTheme = createTheme();

export default function MatchByID() {
    const [match, setMatch] = useState(null);  // Cambié el estado inicial a `null`
    const { id } = useParams();
    const [teamA, setTeamA] = useState(null);  // Cambié el estado inicial a `null`
    const [teamB, setTeamB] = useState(null);  // Cambié el estado inicial a `null`

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const matchData = await getMatchbyId(id);
                setMatch(matchData);

                const teamAData = await getTeambyId(matchData.teamA.team._id);
                setTeamA(teamAData);

                const teamBData = await getTeambyId(matchData.teamB.team._id);
                setTeamB(teamBData);
            } catch (error) {
                console.error("Error fetching match data: ", error);
            }
        };
        fetchMatch();
    }, [id]);

    if (!match || !teamA || !teamB) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Spinner color="dark" size="" />
            </div>
        );
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <HeaderApp />
                <main>
                <Typography component="div" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Nombre del equipo A alineado a la izquierda */}
                    <Link 
                        component={RouterLink} 
                        to={`/teams/${teamA._id}`} 
                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', flexGrow: 1, textAlign: 'left' }}
                    >
                        <Typography variant="h1">{teamA.name}</Typography>
                    </Link>

                    {/* Marcador centrado */}
                    <Typography variant="h1" align="center" style={{ flexGrow: 0, minWidth: '200px' }}>
                        {match.teamA?.score ?? 0} - {match.teamB?.score ?? 0}
                    </Typography>

                    {/* Nombre del equipo B alineado a la derecha */}
                    <Link 
                        component={RouterLink} 
                        to={`/teams/${teamB._id}`} 
                        style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', flexGrow: 1, textAlign: 'right' }}
                    >
                        <Typography variant="h1">{teamB.name}</Typography>
                    </Link>
                </Typography>
                    <Divider />
                    <Typography variant="h6" align="center" gutterBottom>
                        {match.stage} - {match.date}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        {match.isFinished ? "Finalizado" : "En curso"} - Ganador: {match.winningTeam || "N/A"}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        {match.stadium} - {match.city}
                    </Typography>
                    <Divider />
                    <Grid container spacing={3} style={{ marginTop: '20px' }}>
                        <Grid item xs={12} md={6}>
                            <InfoEquipos team={teamA} match={match} lineup={match.teamA.lineup}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoEquipos team={teamB} match={match} lineup={match.teamB.lineup}/>
                        </Grid>
                    </Grid>
                </main>
            </Container>
            <Divider />
            <Footer />
        </ThemeProvider>
    );
}

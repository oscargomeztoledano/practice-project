import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams, Link as RouterLink } from 'react-router-dom';  // Importa useParams y RouterLink
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import HeaderApp from '../HeaderApp';
import Footer from '../Footer';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getTeambyId, getPlayerbyId } from '../../utils/apiCalls';
import Spinner from 'react-bootstrap/Spinner';  
import Typography from '@mui/material/Typography';
const defaultTheme = createTheme();


export default function PlayerByID() {

    const [player, setPlayer] = useState({});
    const {id}= useParams();
    const [team, setTeam] = useState({});

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                // Obtener el jugador por ID
                const playerData = await getPlayerbyId(id);  
                setPlayer(playerData);
                // Obtener el equipo asociado al jugador
                const teamData = await getTeambyId(playerData.team._id);
                setTeam(teamData);
            } catch (error) {
                console.error("Error fetching team data: ", error);
            }
        };
        fetchPlayer();
    }, [id]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
            <Container maxWidth="lg">
                <HeaderApp/>
                <main>
                    {(!player || !team) ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <Spinner color="dark" size=""/>
                        </div>
                    ) : (
                        <Grid container spacing={4}>
                        {/* Nombre del Jugador */}
                        <Grid item xs={12}>
                            <Typography variant="h1" >
                            <Link
                                component={RouterLink}
                                to={`/players/${player._id}`}
                                underline="none"
                                style={{ color: 'black', cursor: 'pointer' }}
                            >
                                {player.name}
                            </Link>
                            </Typography>
                        </Grid>

                        {/* Nombre del Equipo */}
                        <Grid item xs={12}>
                            <Typography variant="h2">
                            <Link
                                component={RouterLink}
                                to={`/teams/${team._id}`}
                                underline="none"
                                style={{ color: 'black', cursor: 'pointer' }}
                            >
                                {team.name}
                            </Link>
                            </Typography>
                        </Grid>

                        <Divider/>

                        {/* Atributos del Jugador */}
                        <Grid item xs={12} sm={8} md={4} style={{ margin: '0 auto' }}>
                            <Typography variant="h6">
                            Position: {player.position}
                            </Typography>
                            <Typography variant="h6">
                            Age: {player.age}
                            </Typography>
                            <Typography variant="h6">
                            Date of Birth: {player.dateOfBirth}
                            </Typography>
                            <Typography variant="h6">
                            Club: {player.club}
                            </Typography>
                            <Typography variant="h6">
                            Goals: {player.goals}
                            </Typography>
                            <Typography variant="h6">
                            Assists: {player.assists}
                            </Typography>
                            <Typography variant="h6">
                            Appearances: {player.appearances}
                            </Typography>
                            <Typography variant="h6">
                            Minutes Played: {player.minutesPlayed}
                            </Typography>
                            <Typography variant="h6">
                            Red Cards: {player.redcards}
                            </Typography>
                            <Typography variant="h6">
                            Yellow Cards: {player.yellowcards}
                            </Typography>
                        </Grid>
                        </Grid>
                    )}
                </main>

            </Container>
            <Footer/>
        </ThemeProvider>
    );
}
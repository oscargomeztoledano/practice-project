import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useParams, Link as RouterLink } from 'react-router-dom';  // Importa useParams y RouterLink
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import HeaderApp from '../HeaderApp';
import Footer from '../Footer';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getTeambyId, getPlayerbyId, getGroupbyId } from '../../utils/apiCalls';
import Spinner from 'react-bootstrap/Spinner';  
import Typography from '@mui/material/Typography';
const defaultTheme = createTheme();


export default function TeamById() {

    const [team, setTeam] = useState({});
    const [players, setPlayers] = useState([]);
    const [group, setGroup] = useState({});
    const {id}= useParams();

    
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                // Obtener el equipo por ID
                const teamData = await getTeambyId(id);  // Usa el ID desde la URL
                setTeam(teamData);
    
                // Obtener los jugadores asociados al equipo
                const playerPromises = teamData.players.map(player =>
                    getPlayerbyId(player._id)
                );
                const playerData = await Promise.all(playerPromises);
                setPlayers(playerData);
    
                // Obtener el grupo asociado al equipo
                const groupData = await getGroupbyId(teamData.group._id);
                setGroup(groupData);
            } catch (error) {
                console.error("Error fetching team data: ", error);
            }
        };
        fetchTeam();
    }, [id]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <HeaderApp />
                <main>
                    {(!team || players.length === 0 || !group) ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <Spinner color="dark" size=""/>
                            </div>):(
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={team.imageUrl}
                                    alt={team.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        <Link
                                            component={RouterLink}
                                            to={`/teams/${team._id}`}
                                            underline="none"
                                            style={{ color: 'black', cursor: 'pointer' }}
                                        >
                                            {team.name}
                                        </Link>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <Typography variant="h6">
                                Coach: {team.coach}
                            </Typography>
                            <Typography variant="h6">
                                Captain: {team.captain}
                            </Typography>
                            <Typography variant="h6">
                                Grupo: 
                                <Link
                                    component={RouterLink}
                                    to={`/groups/${group._id}`}
                                    underline="none"
                                    style={{ color: 'black', cursor: 'pointer', marginLeft: 8 }}
                                >
                                    {group.name}
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5">Jugadores</Typography>
                            <Divider />
                            <Grid container spacing={2}>
                                {players.map((player) => (
                                    <Grid item xs={12} sm={6} key={player._id}>
                                        <Typography variant="body1">
                                            <Link
                                                component={RouterLink}
                                                to={`/players/${player._id}`}
                                                underline="none"
                                                style={{ color: 'black', cursor: 'pointer' }}
                                            >
                                                {player.name} - {player.position}
                                            </Link>
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                )}
                </main>
            </Container>
            <Footer />
        </ThemeProvider>
    );
}
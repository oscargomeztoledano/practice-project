import React, { useState, useEffect } from "react";
import { getLast5Matches, getTeambyId } from "../utils/apiCalls";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';


export default function CardGroup() {
    const [matches, setMatches] = useState([]);
    const [teamNames, setTeamNames] = useState({});

    // Obtiene todos los nombres de los equipos
    const fetchTeamNames = async () => {
        try {
            const matchesData = await getLast5Matches();
            setMatches(matchesData);

            // Recolecta todos los IDs de equipos únicos
            const teamIds = new Set();
            matchesData.forEach(match => {
                teamIds.add(match.teamA.team._id);
                teamIds.add(match.teamB.team._id);
            });

            // Obtén los nombres de los equipos
            const teamNamesMap = {};
            await Promise.all(
                Array.from(teamIds).map(async (teamId) => {
                    try {
                        const team = await getTeambyId(teamId);
                        teamNamesMap[teamId] = team.name;
                    } catch (err) {
                        console.log("Error al obtener el equipo", err);
                        teamNamesMap[teamId] = "Desconocido";
                    }
                })
            );

            setTeamNames(teamNamesMap);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTeamNames();
    }, []);

    const getTeamName = (teamId) => {
        return teamNames[teamId] || "Cargando...";
    };
    
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" component="h2">
                Últimos 5 partidos
            </Typography>
            {matches.map((match) => (
                <CardActionArea key={match._id} component="a" href={`/matches/${match._id}`}>
                    <Card sx={{ display: 'flex' }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5">
                                {getTeamName(match.teamA.team._id)} {match.teamA.score} vs {match.teamB.score} {getTeamName(match.teamB.team._id)}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Date: {match.date}<br/>
                                city: {match.city}<br/>
                                Stadium: {match.stadium}<br/>
                                Stage: {match.stage}<br/>
                                WinningTeam: {match.winningTeam}<br/>
                            </Typography>
                            
                        </CardContent>
                    </Card>
                </CardActionArea>
            ))}
        </Grid>
    );
}

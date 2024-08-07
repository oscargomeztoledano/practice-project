import React, { useState, useEffect } from "react";
import { getLast5Matches, getTeambyId } from "../utils/apiCalls";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


export default function CardGroup() {
    const [matches, setMatches] = useState([]);
    const [teams, setTeams] = useState({});


    //Obtiene los ultimos 5 partidos
    
    // Obtiene todos los nombres de los equipos que viene en matches
    const getTeams = (matches) => {
        try {
            const teamPromises = matches.flatMap(match => [
                getTeambyId(match.teamA.team._id),
                getTeambyId(match.teamB.team._id)
            ]);
            Promise.all(teamPromises)
                .then(teamsArray => {
                    const teamsMap = {};
                    teamsArray.forEach(team => {
                        teamsMap[team._id] = team.name;
                    });
                    setTeams(teamsMap);
                })
                .catch(err => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };
    //cuando se renderiza el componente llama a getMatches
    useEffect(() => {
        const getMatches = () => {
            getLast5Matches()
                .then(matches => {
                    setMatches(matches);
                    return getTeams(matches);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        getMatches();
    }, []);

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" component="h2">
                Últimos 5 partidos
            </Typography>
            {matches.map((match) => (
                <CardActionArea key={match._id} component="a" href={`/matches/${match._id}`}>
                    <Card sx = {{ display: 'flex' }}>
                        <CardContent sx = {{ flex: 1 }}>
                            <Typography component="h2" variant="h5">
                                {teams[(match.teamA.team._id)]} {match.teamA.score} vs {match.teamB.score} {teams[match.teamB.team._id]} 
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Date: {match.date}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Stage: {match.stage}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Description:{match.description}
                            </Typography>
                            <Typography variant="subtitle1" color="text.primary">
                                WinningTeam: {match.winningTeam}
                            </Typography>
                        </CardContent>
                        <CardMedia
                        />
                    </Card>
                </CardActionArea>
            ))}
        </Grid>
    );
}

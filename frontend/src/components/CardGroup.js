import React, { useState, useEffect } from "react";
import { getLast5Matches } from "../utils/apiCalls";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function CardGroup() {
    const [matches, setMatches] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const getMatches = async () => {
        try {
            const matches = await getLast5Matches();
            setMatches(matches);
        } catch (err) {
            console.log(err);
        }
    };
    //cuando se renderiza el componente llama a getMatches
    useEffect(() => {
        getMatches();
    }, []);
    // Cambia la imagen cada 3 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 2);
        }, 3000); // Cambia la imagen cada 3 segundos
        return () => clearInterval(interval);
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
                                {match.teamA.team.name} {match.teamA.score} vs {match.teamB.score} {match.teamB.team.name} 
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {match.date}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {match.description}
                            </Typography>
                            <Typography variant="subtitle1" color="text.primary">
                                winningTeam: {match.winningTeam}
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            sx = {{ width: 151 }}
                            image={currentImageIndex ===0? match.teamA.team.imageUrl: match.teamB.team.imageUrl}
                            alt={currentImageIndex ===0? match.teamA.team.name: match.teamB.team.name}
                        />
                    </Card>
                </CardActionArea>
            ))}
        </Grid>
    );
}

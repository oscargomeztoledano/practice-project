import React from 'react';
import { Typography, Paper, Divider } from '@mui/material';

const InfoEquipo = ({ team, match, lineup }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">{team.name}</Typography>
            <Typography variant="body1">Entrenador: {team.coach}</Typography>
            <Typography variant="body1">Capitán: {team.captain}</Typography>
            <Typography variant="body1">Formación: {lineup?.formation || "N/A"}</Typography>

            <Typography variant="h6" style={{ marginTop: '10px' }}>Jugadores:</Typography>
            {lineup?.players?.map((player, index) => (
                <Typography key={index} variant="body2">
                    {player.player} - {player.status}
                </Typography>
            ))}

            <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />

            <Typography variant="h6">Eventos</Typography>
            {match?.matchEvents
                ?.filter(event => event.team === team.name)
                .map((event, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <Typography variant="body1" gutterBottom>
                            {event.minute}': {event.type}
                        </Typography>
                        {event.type === 'goal' && (
                            <Typography variant="body2" gutterBottom>
                                Goleador: {event.scoringPlayer} - Asistente: {event.assistingPlayer}
                            </Typography>
                        )}
                        {event.type === 'substitution' && (
                            <Typography variant="body2" gutterBottom>
                                Entra: {event.joiningPlayer} - Sale: {event.leavingPlayer}
                            </Typography>
                        )}
                        {event.type === 'card' && (
                            <Typography variant="body2" gutterBottom>
                                Tarjeta: {event.cardColor} - Jugador: {event.bookedPlayer}
                            </Typography>
                        )}
                    </div>
                ))}
        </Paper>
    );
};

export default InfoEquipo;

import React from 'react';
import { Typography, Paper, Divider } from '@mui/material';

const InfoEquipo = ({ team, match, lineup }) => {
    return (
        <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">{team.name}</Typography>
            <Typography variant="body1">Coach: {team.coach}</Typography>
            <Typography variant="body1">Captain: {team.captain}</Typography>
            <Typography variant="body1">lineup: {lineup?.formation || "N/A"}</Typography>

            <Typography variant="h6" style={{ marginTop: '10px' }}>Jugadores:</Typography>
            {lineup?.players?.map((player, index) => (
                <Typography key={index} variant="body2">
                    {player.player} - {player.status}
                </Typography>
            ))}

            <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />

            <Typography variant="h6">Events</Typography>
            {match?.matchEvents
                ?.filter(event => event.team === team.name)
                .map((event, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <Typography variant="body1" gutterBottom>
                            {event.minute}': {event.type}
                        </Typography>
                        {event.type === 'goal' && (
                            <Typography variant="body2" gutterBottom>
                                Score: {event.scoringPlayer} - Assis: {event.assistingPlayer}
                            </Typography>
                        )}
                        {event.type === 'substitution' && (
                            <Typography variant="body2" gutterBottom>
                                Join: {event.joiningPlayer} - Leave: {event.leavingPlayer}
                            </Typography>
                        )}
                        {event.type === 'card' && (
                            <Typography variant="body2" gutterBottom>
                                Card: {event.cardColor} - Player: {event.bookedPlayer}
                            </Typography>
                        )}
                    </div>
                ))}
        </Paper>
    );
};

export default InfoEquipo;

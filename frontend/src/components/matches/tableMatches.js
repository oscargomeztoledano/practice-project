import { Table } from 'reactstrap';
import React, { useEffect, useState } from 'react';
import { getTeambyId } from '../../utils/apiCalls';
import './styles.css'; 

const TableMatches = ({ matches }) => {
    const [matchesData, setMatchesData] = useState([]);

    useEffect(() => {
        console.log('Received match prop:', matches); // Verifica si la prop match está llegando

        const fetchTeamNames = async () => {
            try {
                // Mapea cada equipo para obtener su nombre usando su ID
                const matchesWithNames = await Promise.all(
                    matches.map(async (match) => {
                        console.log('Fetching team names for match:', match); // Verifica los datos de cada partido
                        const teamData = await getTeambyId(match.teamA.team._id); // Llama a la API para obtener el nombre del equipo
                        const teamData2 = await getTeambyId(match.teamB.team._id); // Llama a la API para obtener el nombre del equipo
                        return {
                            ...match,
                            teamAName: teamData.name, // Añade el nombre del equipo al objeto original
                            teamBName: teamData2.name
                        };
                    })
                );
                setMatchesData(matchesWithNames); // Actualiza el estado con los datos ordenados
            } catch (error) {
                console.error('Error fetching team names:', error);
            }
        };

        if (matches && matches.length > 0) {
            fetchTeamNames();
        }
    }, [matches]);

    return (
        <Table className='fixed-size-table' borderless striped hover responsive style={{ margin: '0 auto' }}>
            <thead>
                <tr>
                    <th>Local</th>
                    <th>Result</th>
                    <th>Visitor</th>
                </tr>
            </thead>
            <tbody>
                {matchesData.map((match) => (
                    <tr key={match._id}>
                        <td><a href={`/teams/${match.teamA.team._id}`}style={{textDecoration: 'none', cursor: 'pointer', color: 'inherit' }}>{match.teamAName}</a></td>
                        <td><a href={`/matches/${match._id}`}style={{textDecoration: 'none', cursor: 'pointer', color: 'inherit' }}>{match.teamA.score} vs {match.teamB.score}</a></td>
                        <td><a href={`/teams/${match.teamB.team._id}`}style={{textDecoration: 'none', cursor: 'pointer', color: 'inherit' }}>{match.teamBName}</a></td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableMatches;
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import 'react-data-table-component-extensions/dist/index.css';
import { getTeambyId} from '../../utils/apiCalls';

const TableGroups = ({teams}) => {
    const [teamsData, setTeamsData] = useState([]);

    useEffect(() => {
        const fetchTeamNames = async () => {
            try {
                // Mapea cada equipo para obtener su nombre usando su ID
                const teamsWithNames = await Promise.all(
                    teams.map(async (groupTeam) => {
                        const teamData = await getTeambyId(groupTeam.team._id); // Llama a la API para obtener el nombre del equipo
                        return {
                            ...groupTeam,
                            name: teamData.name // Añade el nombre del equipo al objeto original
                        };
                    })
                );
                // Ordena los equipos primero por puntos y luego por goles marcados (GS)
                const sortedTeams = teamsWithNames.sort((a, b) => {
                    if (b.points === a.points) {
                        return b.goalsScored - a.goalsScored; // Si hay empate en puntos, ordena por GS
                    }
                    return b.points - a.points; // Ordena por puntos de mayor a menor
                });

                setTeamsData(sortedTeams); // Actualiza el estado con los datos ordenados
            } catch (error) {
                console.error('Error fetching team names:', error);
            }
        };

        fetchTeamNames();
    }, [teams]); // Ejecuta este efecto cuando groupTeams cambia





    const columns = [
        {
            name: 'Teams',
            selector: row => row.name,
            sortable: true,
            cell: row => <a href={`/teams/${row.team._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{row.name}</a>
        },
        {
            name: 'Points',
            selector: row => row.points,
            sortable: true
        },
        {
            name: 'Matches Played',
            selector: row => row.matchesPlayed,
            sortable: true
        },
        {
            name: 'Wins',
            selector: row => row.wins,
            sortable: true
        },
        {
            name: 'Draws',
            selector: row => row.draws,
            sortable: true
        },
        {
            name: 'Losses',
            selector: row => row.losses,
            sortable: true
        },
        {
            name: 'GS',
            selector: row => row.goalsScored,
            sortable: true
        },
        {
            name: 'GC',
            selector: row => row.goalsConceded,
            sortable: true
        },
        {
            name: 'GD',
            selector: row => row.goalDifference,
            sortable: true
        }
    ];
    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold', // Hacer los títulos de las columnas en negrita
            },
        },
    };

    return (
        <DataTable
            columns={columns}
            data={teamsData}
            customStyles={customStyles}
            persistTableHead
            highlightOnHover
            striped
            responsive
        />
    );
};
export default TableGroups;
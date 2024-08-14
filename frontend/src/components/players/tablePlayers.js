import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { getTeambyId, getAllPlayers } from '../../utils/apiCalls';

const TablePlayers = () => {
    const [players, setPlayers] = useState([]);

    const fetchPlayers = async () => {
        try {
            const playersData = await getAllPlayers();
            
            // Create a mapping of team IDs to team names
            const teamid = new Set();
            playersData.forEach(player => {
                if (!teamid.has(player.team._id))
                    teamid.add(player.team._id);
            });

            const teamNamesMap = {};
            await Promise.all(
                Array.from(teamid).map(async (teamId) => {
                    try {
                        const team = await getTeambyId(teamId);
                        teamNamesMap[teamId] = team.name;
                    } catch (err) {
                        console.log("Error al obtener el equipo", err);
                        teamNamesMap[teamId] = "Desconocido";
                    }
                })
            );

            // Add team name to each player object
            const playersWithTeamNames = playersData.map(player => ({
                ...player,
                teamName: teamNamesMap[player.team._id] || "Desconocido"
            }));
            setPlayers(playersWithTeamNames);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPlayers();
    }, []);


    const columns = [
        {
            name: 'Players',
            selector: row => row.name,
            sortable: true,
            cell: row => <a href={`/players/${row._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{row.name}</a>
        },
        {
            name: 'Team',
            selector: row => row.teamName,
            sortable: true,
            cell: row => <a href={`/teams/${row.team._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{row.teamName}</a>
        },
        {
            name: 'Position',
            selector: row => row.position,
            sortable: true,
        },
        {
            name: 'Age',
            selector: row => row.age,
            sortable: true,
        },
        {
            name: 'Date of Birth',
            selector: row => row.dateOfBirth,
            sortable: true,
       },
        {
            name: 'Club',
            selector: row => row.club,
            sortable: true,
        },
    ];

    const tableData = {
        columns,
        data: players,
        filter: true,
        export: false,
        print: false,
        exportHeaders: true,
        filterFunction: (rows, filters) => {
            const searchText = filters.toLowerCase();
            return rows.filter(player => {
                return (
                    player.name.toLowerCase().includes(searchText) ||
                    player.teamName.toLowerCase().includes(searchText) ||
                    player.position.toLowerCase().includes(searchText) ||
                    player.club.toLowerCase().includes(searchText)
                );
            });
        }
    };
    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold', // Hacer los títulos de las columnas en negrita
            },
        },
    };
    return (
        <DataTableExtensions {...tableData}>
            <DataTable
                columns={columns}
                data={players}
                pagination
                persistTableHead
                highlightOnHover
                striped
                responsive
                customStyles={customStyles}
            />
        </DataTableExtensions>
    );
};

export default TablePlayers;

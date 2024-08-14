import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { getGroupbyId, getAllTeams } from '../../utils/apiCalls';

const TableTeams = () => {
    const [teams, setTeams] = useState([]);
    const [groupNames, setGroupNames] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [filters, setFilters] = useState({
        name: '',
        coach: '',
        captain: '',
        championships: '',
        runnersUp: '',
        group: ''
    });

    const fetchTeams = async () => {
        try {
            const teamsData = await getAllTeams();
            setTeams(teamsData);

            const groupid = new Set();
            teamsData.forEach(team => {
                if (!groupid.has(team.group._id))
                    groupid.add(team.group._id);
            });

            const groupNamesMap = {};
            await Promise.all(
                Array.from(groupid).map(async (groupId) => {
                    try {
                        const group = await getGroupbyId(groupId);
                        groupNamesMap[groupId] = group.name;
                    } catch (err) {
                        console.log("Error al obtener el grupo", err);
                        groupNamesMap[groupId] = "Desconocido";
                    }
                })
            );
            setGroupNames(groupNamesMap);
        } catch (err) {
            console.log(err);
        }
    }

    const getGroupName = (groupId) => {
        return groupNames[groupId];
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleFilterChange = (key, value) => {
        setFilters({
            ...filters,
            [key]: value
        });
    };

    const filteredTeams = teams.filter(team => {
        return Object.keys(filters).every(key => {
            if (!filters[key]) return true;
            if (key === 'group') {
                return getGroupName(team.group._id).toLowerCase().includes(filters[key].toLowerCase());
            }
            return team[key].toString().toLowerCase().includes(filters[key].toLowerCase());
        });
    });

    const sortedTeams = [...filteredTeams].sort((a, b) => {
        if (sortConfig.key) {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            if (sortConfig.key === 'group') {
                aValue = getGroupName(a.group._id);
                bValue = getGroupName(b.group._id);
            }

            if (typeof aValue === 'string') {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
        }
        return 0;
    });

    useEffect(() => {
        fetchTeams();
    }, []);

    return (
        <Table borderless striped hover responsive>
            <thead>
                <tr>
                    <th style={{ width: '120px' }}>
                        <div onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>Name</div>
                        <input
                            type="text"
                            value={filters.name}
                            onChange={(e) => handleFilterChange('name', e.target.value)}
                            placeholder="Filter"
                            style={{ width: '120px' }}
                        />
                    </th>
                    <th style={{ width: '150px' }}>
                        <div onClick={() => handleSort('coach')} style={{ cursor: 'pointer' }}>Coach</div>
                        <input
                            type="text"
                            value={filters.coach}
                            onChange={(e) => handleFilterChange('coach', e.target.value)}
                            placeholder="Filter"
                            style={{ width: '150px' }}
                        />
                    </th>
                    <th style={{ width: '150px' }}>
                        <div onClick={() => handleSort('captain')} style={{ cursor: 'pointer' }}>Captain</div>
                        <input
                            type="text"
                            value={filters.captain}
                            onChange={(e) => handleFilterChange('captain', e.target.value)}
                            placeholder="Filter"
                            style={{ width: '150px' }}
                        />
                    </th>
                    <th style={{ width: '150px',  textAlign: 'center'  }}>
                    <div onClick={() => handleSort('championships')} style={{ textAlign: 'center', cursor: 'pointer' }}>Championships</div>
                        <input
                            type="text"
                            value={filters.championships}
                            onChange={(e) => handleFilterChange('championships', e.target.value)}
                            placeholder="Filter"
                            style={{ width: '150px', textAlign: 'center' }}
                        />
                    </th>
                    <th style={{ width: '150px',  textAlign: 'center' }}>
                    <div onClick={() => handleSort('runnersUp')} style={{ textAlign: 'center', cursor: 'pointer' }}>Runnersup</div>
                        <input
                            type="text"
                            value={filters.runnersUp}
                            onChange={(e) => handleFilterChange('runnersUp', e.target.value)}
                            placeholder="Filter"
                            style={{ width: '150px', textAlign: 'center' }}
                        />
                    </th>
                    <th style={{ width: '150px',  textAlign: 'center'  }}>
                    <div onClick={() => handleSort('group')} style={{ textAlign: 'center', cursor: 'pointer' }}>Group</div>
                        <input
                            type="text"
                            value={filters.group}
                            onChange={(e) => handleFilterChange('group', e.target.value)}
                            placeholder="Filter"
                            style={{ width: '150px', textAlign: 'center' }}
                        />
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortedTeams.map(team => {
                    return (
                        <tr key={team._id}>
                            <td><a href={`/teams/${team._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{team.name}</a></td>
                            <td>{team.coach}</td>
                            <td><a href={`/players/${team.captain}`} style={{ textDecoration: 'none', color: 'inherit' }}>{team.captain}</a></td>
                            <td style={{ textAlign: 'center' }}>{team.championships}</td>
                            <td style={{ textAlign: 'center' }}>{team.runnersUp}</td>
                            <td style={{ textAlign: 'center' }}><a href={`/groups/${team.group._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{getGroupName(team.group._id)}</a></td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default TableTeams;
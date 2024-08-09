import api from './api';

export{
    getAllPlayers,
    getAllTeams,
    getAllMatches,
    getAllGroups,
    getTeambyId,
    getLast5Matches
};


function getAllPlayers() {
    return api.get('/players').then(({ data }) => data);
}

function getAllTeams() {
    return api.get('/teams').then(({ data }) => data);
}

function getAllMatches() {
    return api.get('/matches').then(({ data }) => data);
}

function getAllGroups() {
    return api.get('/groups').then(({ data }) => data);
}

function getLast5Matches() {
    return api.get('/matches/last5').then(({ data }) => data);
}

function getTeambyId(id) {
    return api.get(`/teams/${id}`).then(({ data }) => data);
}

//To DO: Implementar el resto de llamadas necesarias al backend
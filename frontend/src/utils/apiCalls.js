import API from './api';

export{
    getAllPlayers,
    getAllTeams,
    getAllMatches,
    getAllGroups,
    getTeambyId,
    getLast5Matches
};


function getAllPlayers() {
    return API.get('/players').than(response => response.data);
}
function getAllTeams() {
    return API.get('/teams').than(response => response.data);
}
function getAllMatches() {
    return API.get('/matches').than(response => response.data);
}
function getAllGroups() {
    return API.get('/groups').than(response => response.data);
}
function getLast5Matches() {
    return API.get('/matches/last5').than(response => response.data);
}
function getTeambyId(id) {
    return API.get(`/teams/${id}`).than(response => response.data);
}
//To DO: Implementar el resto de llamadas necesarias al backend
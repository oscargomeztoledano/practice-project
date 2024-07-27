import { get } from 'mongoose';
import API from './api';

export{
    getAllPlayers,
    getAllTeams,
    getAllMatches,
    getAllGroups
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

//To DO: Implementar el resto de llamadas necesarias al backend
import api from './api';

const inFlightPromises = {};
const CACHE_ET = 1000 * 60 * 5; // 5 minutes

// Función para abrir la base de datos IndexedDB
function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('myPWA_DB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('cacheStore')) {
                db.createObjectStore('cacheStore', { keyPath: 'key' });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

// Función para recuperar datos de IndexedDB
function getCachedData(key) {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction('cacheStore', 'readonly');
            const store = transaction.objectStore('cacheStore');
            const request = store.get(key);

            request.onsuccess = (event) => {
                const cachedItem = event.target.result;
                if (cachedItem) {
                    const now = new Date().getTime();
                    if (now - cachedItem.timestamp < CACHE_ET) {
                        resolve(cachedItem.data);
                    } else {
                        // Datos expirados
                        deleteCachedData(key); // Eliminar datos expirados
                        resolve(null);
                    }
                } else {
                    resolve(null);
                }
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    });
}

// Función para guardar datos en IndexedDB
function setCachedData(key, data) {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction('cacheStore', 'readwrite');
            const store = transaction.objectStore('cacheStore');
            const request = store.put({ key, data, timestamp: new Date().getTime() });

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    });
}

// Función para eliminar datos de IndexedDB
function deleteCachedData(key) {
    return openDB().then((db) => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction('cacheStore', 'readwrite');
            const store = transaction.objectStore('cacheStore');
            const request = store.delete(key);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(event.target.error);
            };
        });
    });
}

// Función para manejar solicitudes y almacenamiento en caché
function fetchAndCache(key, fetchFunc) {
    if (inFlightPromises[key]) {
        return inFlightPromises[key];
    }

    const promise = fetchFunc().then(data => {
        return setCachedData(key, data).then(() => {
            delete inFlightPromises[key];
            return data;
        });
    }).catch(error => {
        delete inFlightPromises[key];
        throw error;
    });

    inFlightPromises[key] = promise;
    return promise;
}


// comprobamos si la informacion esta en la cache, si no esta la solicitamos a la api
function getAllPlayers() {
    const key = 'players';
    return getCachedData(key).then(data => {
        if (data) {
            return data;
        } else {
            return fetchAndCache(key, () => api.get('/players').then(({ data }) => data));
        }
    });
}
function getAllTeams() {
    const key = 'teams';
    return getCachedData(key).then(data => {
        if (data) {
            return data;
        } else {
            return fetchAndCache(key, () => api.get('/teams').then(({ data }) => data));
        }
    });
}

function getAllMatches() {
    const key = 'matches';
    return getCachedData(key).then(data => {
        if (data) {
            return data;
        } else {
            return fetchAndCache(key, () => api.get('/matches').then(({ data }) => data));
        }
    });
}

function getAllGroups() {
    const key = 'groups';
    return getCachedData(key).then(data => {
        if (data) {
            return data;
        } else {
            return fetchAndCache(key, () => api.get('/groups').then(({ data }) => data));
        }
    });
}

function getLast12Matches() {
    const key = 'last12matches';
    return getCachedData(key).then(data => {
        if (data) {
            return data;
        } else {
            return fetchAndCache(key, () => api.get('/matches/last12').then(({ data }) => data));
        }
    });
}

function getTeambyId(id) {
    const key = `team_${id}`;
    return getCachedData(key).then(data => {
        if (data) {
            return data;
        } else {
            return fetchAndCache(key, () => api.get(`/teams/${id}`).then(({ data }) => data));
        }
    });
}

function getGroupbyId(id) {
    const key = `group_${id}`;
    return getCachedData(key).then(data => {
        if (data) {
            return data;
        } else {
            return fetchAndCache(key, () => api.get(`/groups/${id}`).then(({ data }) => data));
        }
    });
}

function getMatchbyId(id) {
    const key = `match_${id}`;
    return getCachedData(key).then(data => {
        if (data) {
            return data;
        } else {
            return fetchAndCache(key, () => api.get(`/matches/${id}`).then(({ data }) => data));
        }
    });
}

function getPlayerbyId(id) {
    const key = `player_${id}`;
    return getCachedData(key).then(data => {
        if (data) {
            return data;
        } else {
            return fetchAndCache(key, () => api.get(`/players/${id}`).then(({ data }) => data));
        }
    });
}

export {
    getAllPlayers,
    getAllTeams,
    getAllMatches,
    getAllGroups,
    getTeambyId,
    getGroupbyId,
    getMatchbyId,
    getPlayerbyId,
    getLast12Matches
};
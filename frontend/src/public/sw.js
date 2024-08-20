/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'my-pwa-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
    '../public/index.html',
    '../public/manifest.json',
    '../public/favicon.ico',
    '../public/logo192.png',
    '../public/logo512.png',
    '../src/App.js',
    '../src/index.js',
    '../src/index.css',
    '../src/logo.svg',
    '../src/Home.js',
    '../src/reportWebVitals.js',
    '../src/setupTests.js',
    '../src/utils/api.js',
    '../src/utils/apiCalls.js',
    '../src/inicializers/firebase.js',
    '../src/images/euro1.jpg',
    '../src/images/euro2.jpg',
    '../src/images/euro3.jpg',
    '../src/components/CardGroup.js',
    '../src/components/Carousel.js',
    '../src/components/Carousel.css',
    '../src/components/Footer.js',
    '../src/components/HeaderApp.js',
    '../src/components/HeaderApp.css',
    '../src/components/Login.js',
    '../src/components/Logout.js',
    '../src/components/groups/home.js',
    '../src/components/groups/tableGroups.js',
    '../src/components/matches/home.js',
    '../src/components/matches/tableMatches.js',
    '../src/components/matches/styles.css',
    '../src/components/players/home.js',
    '../src/components/players/tablePlayers.js',
    '../src/components/teams/home.js',
    '../src/components/teams/tableTeams.js',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activación del Service Worker para eliminar cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch handler - manejar las solicitudes de red
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {  //solicitud que contenga /api/ TODO cambiar esto por que los fetch no llevan /api/
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            // Si la respuesta es buena, clónala y guárdala en la caché.
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          })
          .catch((err) => {
            // Si falla la red, intenta obtenerlo de la caché.
            return cache.match(event.request);
          });
      })
    );
    return;
  }
  
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request);
      });
    })
  );
});

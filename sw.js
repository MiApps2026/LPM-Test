// sw.js - Service Worker mínimo
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Estrategia: Network only (por ahora)
  // Deja pasar todas las peticiones a la red.
  return; 
});
const CACHE_NAME = 'lpm-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  // Forzar activación inmediata
  self.skipWaiting();
  
  // Cachear assets críticos OBLIGATORIO para PWA Install Prompt
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Estrategia: Cache First, falling back to Network
  // Esto garantiza que la app cargue offline (requisito PWA)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
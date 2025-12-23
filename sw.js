const CACHE_NAME = 'podcast-app-v1';
const ASSETS = [
    './',
    './index.html',
    './manifest.json'
];

// Install: Cache the app shell
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Fetch: Serve from cache if available, else network
self.addEventListener('fetch', (e) => {
    // specific strategy for RSS feeds or Audio could go here
    // For now, try network first for everything (to get fresh feeds), fall back to cache
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
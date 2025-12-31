const CACHE_PREFIX = 'podcasts-cache';
const CACHE_VERSION = 'v2';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.webmanifest',
  '/assets/icons/icon-192.svg',
  '/assets/icons/icon-512.svg',
  '/assets/icons/apple-touch-icon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
  self.clients.claim();
});

// utility: network timeout
function networkTimeout(resource, timeout = 7000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Network timeout')), timeout);
    fetch(resource).then(res => { clearTimeout(timer); resolve(res); }).catch(err => { clearTimeout(timer); reject(err); });
  });
}

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Navigation requests: network-first with offline fallback
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(resp => { caches.open(CACHE_NAME).then(cache => cache.put(req, resp.clone())); return resp; })
      .catch(() => caches.match(req).then(cached => cached || caches.match('/offline.html')))
    );
    return;
  }

  // RSS / XML feed requests: network-first with timeout, cache fallback
  if (/\.rss$|\.xml$|\/rss|\/feeds|\/feed/i.test(url.pathname + url.search)) {
    event.respondWith(
      networkTimeout(req, 6000).then(r => { caches.open(CACHE_NAME).then(cache => cache.put(req, r.clone())); return r; }).catch(() => caches.match(req))
    );
    return;
  }

  // For other GET requests, use stale-while-revalidate for assets
  if (req.method === 'GET') {
    event.respondWith(
      caches.match(req).then(cached => {
        const network = fetch(req).then(resp => { if (resp && resp.status === 200 && resp.type === 'basic') { caches.open(CACHE_NAME).then(cache => cache.put(req, resp.clone())); } return resp; }).catch(() => null);
        return cached || network.then(r => r).catch(() => cached);
      })
    );
  }
});

self.addEventListener('message', event => {
  if (!event.data) return;
  if (event.data === 'skipWaiting') self.skipWaiting();
});
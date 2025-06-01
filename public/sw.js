const CACHE_NAME = 'algroy-portal-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/assets/Avatar.png',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            )
        )
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;


    if (request.mode === 'navigate') {
        event.respondWith(
            caches.match('/index.html').then((cachedResponse) => {
                return cachedResponse || fetch(request);
            }).catch(() => {

                return caches.match('/index.html');
            })
        );
        return;
    }

    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            return cachedResponse || fetch(request);
        })
    );
});

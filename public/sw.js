const CACHE_VERSION = "v2";
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;

self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const names = await caches.keys();
            await Promise.all(
                names.map((n) => (n !== RUNTIME_CACHE ? caches.delete(n) : undefined))
            );
            await self.clients.claim();
        })()
    );
});

self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

const shouldCacheRequest = (request) => {
    if (request.method !== "GET") return false;
    const url = new URL(request.url);

    if (url.origin !== self.location.origin) return false;

    if (url.pathname.startsWith("/sw.js")) return false;

    if (url.pathname.startsWith("/api/")) return false;

    return true;
};

self.addEventListener("fetch", (event) => {
    const req = event.request;

    if (req.mode === "navigate") {
        event.respondWith(
            (async () => {
                try {
                    const fresh = await fetch(req);
                    const cache = await caches.open(RUNTIME_CACHE);
                    cache.put("/", fresh.clone());
                    return fresh;
                } catch {
                    const cache = await caches.open(RUNTIME_CACHE);
                    const fallback = await cache.match("/") || await cache.match("/index.html");
                    if (fallback) return fallback;
                    return new Response(
                        "<!doctype html><title>Offline</title><h1>Offline</h1><p>Connect and reload.</p>",
                        { headers: { "Content-Type": "text/html" } }
                    );
                }
            })()
        );
        return;
    }

    if (shouldCacheRequest(req)) {
        event.respondWith(
            (async () => {
                const cache = await caches.open(RUNTIME_CACHE);
                const cached = await cache.match(req);
                if (cached) return cached;

                const resp = await fetch(req);
                if (resp && resp.status === 200 && resp.type === "basic") {
                    cache.put(req, resp.clone());
                }
                return resp;
            })()
        );
    }
});

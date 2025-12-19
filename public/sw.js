const CACHE_VERSION = "v3";
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

const isSameOriginGet = (request) => {
    if (request.method !== "GET") return false;
    const url = new URL(request.url);
    return url.origin === self.location.origin;
};

const shouldIgnore = (request) => {
    const url = new URL(request.url);

    if (url.pathname === "/sw.js") return true;

    if (url.pathname.startsWith("/api/")) return true;

    return false;
};

self.addEventListener("fetch", (event) => {
    const req = event.request;

    if (!isSameOriginGet(req) || shouldIgnore(req)) return;

    if (req.mode === "navigate") {
        event.respondWith(
            (async () => {
                const cache = await caches.open(RUNTIME_CACHE);
                try {
                    const fresh = await fetch(req);
                    cache.put(req, fresh.clone());
                    return fresh;
                } catch {
                    return (
                        (await cache.match(req)) ||
                        (await cache.match("/index.html")) ||
                        new Response(
                            "<!doctype html><title>Offline</title><h1>Offline</h1><p>Connect and reload.</p>",
                            { headers: { "Content-Type": "text/html" } }
                        )
                    );
                }
            })()
        );
        return;
    }

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
});

const CACHE_NAME = "roamzyee-cache-v4";  // Updated cache version
const urlsToCache = [
    "./",  // Ensures proper caching in GitHub Pages or subdirectories
    "./index.html",
    "./welcome.html",
    "./style.css",
    "./logo.png",
    "./icon-192.png",
    "./icon-512.png",
    "./manifest.json"
];

// Install event - Cache static assets
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting(); // Activates service worker immediately
});

// Fetch event - Serve files from cache, then fetch from network if not cached
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch(() => {
            // Fallback response (Optional)
            if (event.request.destination === "document") {
                return caches.match("./index.html");
            }
        })
    );
});

// Activate event - Clean old caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Ensures control of all open clients immediately
});

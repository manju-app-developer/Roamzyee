const CACHE_NAME = "roamzyee-cache-v3"; // Updated cache version
const urlsToCache = [
    "/",
    "/index.html",
    "/welcome.html",
    "/style.css",
    "/logo.png",
    "/icon-192.png",
    "/icon-512.png",
    "/manifest.json"
];

// Install Service Worker & Cache Essential Resources
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Caching essential resources...");
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate & Clean Up Old Caches
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Network-First Strategy (Always Try Fetching Fresh Content)
self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request)
            .then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
            .catch(() => caches.match(event.request))
    );
});

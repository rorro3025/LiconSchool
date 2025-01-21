const addResourcesToCache = async (resource) => {
    try {
        const cache = await caches.open("v1");
        await cache.addAll(resource);
        console.log("files added to cache");
    } catch (err) {
        console.log(err);
    }
};

self.addEventListener("install", function (event) {
    event.waitUntil(addResourcesToCache([
        "/",
        "/index.html",
        "/offline.html",
        "/styles.css",
        //"/app.js",
        //"/script.js",
        //"/manifest.json",
        "/icon-192x192.png",
        "/icon-512x512.png",
    ]));
    return claim();
});

const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }
    return fetch(request);
};

self.addEventListener("fetch", function (event) {
    console.log("👨‍⚕️", event.request);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        }),
    );
});

const addResourcesToCache = async (resource) => {
    try {
        const cache = await caches.open("v1");
        await cache.addAll(resource);
        console.log("files added to cache");
    } catch (err) {
        console.log(err);
    }
};

const fallbackDocument = async (request) => {
    const { method, headers, url } = request;

    try {
        return fetch(request);
    } catch (err) {
        console.log("Fallback response to", url);
        if (method === "GET" && headers.get("accept").includes("text/html")) {
            return caches.match("/offline.html");
        }
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

const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
};

const cacheFirst = async (request) => {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
        return responseFromCache;
    }
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
};

self.addEventListener("fetch", function (event) {
    event.respondWith(
        cacheFirst(event.request),
    );
});

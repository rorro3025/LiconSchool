const CACHE_NAME = "v1";

const addResourcesToCache = async (resource) => {
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(resource);
        console.log("files added to cache");
    } catch (err) {
        console.log(err);
    }
};

self.addEventListener("install", function (event) {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.add(new Request('offline.html', { cache: 'reload' }));
        })()
    )
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
    return self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        (async () => {
            if ('navigationPreload' in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })()
    )
    console.log('Service Worker: Activado');
    return self.clients.claim();
});

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
    console.log("👨‍⚕️ Interceptando fetch:", event.request.url);
    event.respondWith(
        (async () => {
            try {
                const preloadPage = await event.preloadResponse;
                if (preloadPage) {
                    console.log('Usando página pre-cargada');
                    return preloadPage;
                }
                const networkResponse = await fetch(event.request);
                return networkResponse
            } catch (err) {
                console.error('Error al recuperar la respuesta de la red:', err);
                const cache = await caches.open(CACHE_NAME);
                const cachedResponse = await cache.match('offline.html');
                return cachedResponse
            }
        })()
    );
    /*
    event.respondWith(
        cacheFirst(event.request),
    );
    */
});

self.addEventListener('push', function (event) {
    console.log('Push recibido:', event);

    let notificationData = {};
    if (event.data) {
        try {
            notificationData = event.data.json();
            console.log('Datos de la notificación:', notificationData);
        } catch (e) {
            console.log('Error al parsear datos:', e);
            notificationData = {
                title: 'Notificación',
                body: event.data.text()
            };
        }
    }

    const options = {
        body: notificationData.body || 'Notificación sin mensaje',
        icon: notificationData.icon || '/icon-192x192.png',
        badge: '/icon-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1',
            ...notificationData.data
        }
    };

    console.log('Mostrando notificación con opciones:', options);

    event.waitUntil(
        self.registration.showNotification(notificationData.title || 'Notificación Push', options)
            .then(() => console.log('Notificación mostrada con éxito'))
            .catch(error => console.error('Error al mostrar notificación:', error))
    );
});

self.addEventListener('notificationclick', function (event) {
    console.log('Click en notificación:', event);
    event.notification.close();

    event.waitUntil(
        clients.openWindow('/')
            .then(() => console.log('Ventana abierta'))
            .catch(error => console.error('Error al abrir ventana:', error))
    );
});


const cacheName = 'app-shell-resources'
const dynamicCacheName = 'dynamic-cache-v1'
const assets = [
    '/',
    'index.html', 
    'js/app.js', 
    'js/common.js',
    'js/materialize.min.js',
    'css/styles.css',
    'css/materialize.min.css',
    'img/pkcontacts.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'favicon.ico',
    'img/icons/icon_x192.png'
]

self.addEventListener('install', evt => {
    console.log("Service Worker: installed")
    evt.waitUntil(
        caches
        .open(cacheName)
        .then( cache => cache.addAll(assets))
    )
})
self.addEventListener('activate', evt => {
    console.log("Service Worker: activated")
    evt.waitUntil(
        caches
            .keys()
            .then(keys => {
                return Promise.all(
                    keys
                        .filter(key => key !== cacheName)
                        .map(key => caches.delete())
                    )
            })
    )
})
self.addEventListener('fetch', evt => {
    console.log("Service Worker: fetch")
    evt.respondWith(
        caches
            .match(evt.request)
            .then(cacheRes => {
                return cacheRes || fetch(evt.request)
                    .then(fetchRes => {
                        return caches
                            .open(dynamicCacheName)
                            .then( cache => {
                                cache.put(evt.request.url, fetchRes.clone())
                                return fetchRes
                        })
                })
            })
    )
})
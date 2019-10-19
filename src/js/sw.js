workbox.routing.registerRoute(
    /wmts/,
    new workbox.strategies.CacheFirst({
        cacheName: 'tiles',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
        ],
    }),
);


// workbox.routing.registerRoute(/default/, async ({ url, event }) => {
//     console.log(url,event)
//     return new Response(`Custom handler response.`);
// });

// self.addEventListener('fetch', event => {
//     let url = event.request.url;
//     if (url.indexOf('sealevel') > -1)
//         console.log(event.request.url)

//     // Prevent the default, and handle the request ourselves.
//     event.respondWith(async ()=> {
//         // Try to get the response from a cache.
//         // const cache = await caches.open('dynamic-v1');
//         // const cachedResponse = await cache.match(event.request);

//         // if (cachedResponse) {
//         //     // If we found a match in the cache, return it, but also
//         //     // update the entry in the cache in the background.
//         //     event.waitUntil(cache.add(event.request));
//         //     return cachedResponse;
//         // }
//         event.request.url = "www.google.com";
//         // If we didn't find a match in the cache, use the network.
//         return fetch(event.request);
//     }());
// });

// self.addEventListener('fetch', event => {
//     if (url.indexOf('sealevel') > -1) {

//         // Let the browser do its default thing
//         // for non-GET requests.
//         // if (event.request.method != 'GET') return;

//         // Prevent the default, and handle the request ourselves.
//         event.respondWith(async function () {
//             // Try to get the response from a cache.
//             // const cache = await caches.open('dynamic-v1');
//             // const cachedResponse = await cache.match(event.request);

//             // if (cachedResponse) {
//             //     // If we found a match in the cache, return it, but also
//             //     // update the entry in the cache in the background.
//             //     event.waitUntil(cache.add(event.request));
//             //     return cachedResponse;
//             // }
//             // console.log(event.request, new Request(event.request))
//             event.request.url = "www.google.com";
//             console.log(event.request)
//             // If we didn't find a match in the cache, use the network.
//             return fetch(event.request);
//         }());
//     }
// });
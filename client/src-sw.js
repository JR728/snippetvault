const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route specified assets based on the Workbox manifest
precacheAndRoute(self.__WB_MANIFEST);

// Cache strategy for pages using CacheFirst with expiration
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Cacheable response plugin for handling specified statuses
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Expiration plugin for defining the maximum age of cached pages
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
    }),
  ],
});

// Warm strategy cache for specified URLs using the pageCache strategy
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route for navigation requests using the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Register a route for certain request destinations (style, script, worker)
// using StaleWhileRevalidate strategy with expiration
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      // Cacheable response plugin for handling specified statuses
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Register a cache name
const CACHE_NAME = 'scaling-fishstick-cache-v1';

// List of files to cache
const FILES_TO_CACHE = [
  '/',
  'scaling-fishstick/index.html',
  '/scaling-fishstick/styles.css', // Corrected CSS file path
  '/scaling-fishstick/script.js',  // Corrected JS file path
  '/scaling-fishstick/analyse.png',
  '/scaling-fishstick/pro.png',
  '/scaling-fishstick/product.png',
  '/scaling-fishstick/home/index.html',
  '/scaling-fishstick/home/71122-537102350_medium.mp4',
  '/scaling-fishstick/home/product.jpg',
  '/scaling-fishstick/home/styles.css',
  '/scaling-fishstick/home/video_sea.mp4', // Added missing file extension
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      try {
        await cache.addAll(FILES_TO_CACHE);
        console.log('Alle Dateien gecached');
      } catch (error) {
        console.error('Fehler beim Cachen:', error);
      }
    })
  );
});


// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event - serve cached content
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
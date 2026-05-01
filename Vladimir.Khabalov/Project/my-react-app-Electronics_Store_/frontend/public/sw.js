// sw.js (в папке public)
const CACHE_NAME = 'footer-v1';
const FOOTER_ASSETS = [
  '/static/css/Footer.css',
  '/static/js/Footer.js',
  '/images/icons/mobile.svg',
  '/images/social_icons/vk.png',
  '/images/social_icons/whatsapp.png',
  '/images/social_icons/telegram.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FOOTER_ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
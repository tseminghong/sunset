const CACHE_NAME = 'ict-revision-hub-v1'
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png'
]

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch event - Network First strategy for HTML, Cache First for assets
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip external requests
  if (url.origin !== location.origin) return

  // Network First for HTML pages
  if (request.destination === 'document') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, responseClone))
          return response
        })
        .catch(() => caches.match(request))
    )
    return
  }

  // Cache First for static assets
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image' ||
      url.pathname.includes('/_next/static/')) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) return response
          
          return fetch(request)
            .then((response) => {
              const responseClone = response.clone()
              caches.open(CACHE_NAME)
                .then((cache) => cache.put(request, responseClone))
              return response
            })
        })
    )
    return
  }

  // Network First for API requests
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  )
})
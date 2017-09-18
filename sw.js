const filesToCache = [
	'/',
	'/index.html',
	'/manifest.json',
	'/mini-pwa.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.2/vue.min.js',
	'https://unpkg.com/axios@0.16.2/dist/axios.min.js',
	'/app.min.js',
	'/call-sw.js'
]

self.addEventListener('install', function(event) {
	self.skipWaiting()
	event.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll(filesToCache)
		})
	)
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			return response || fetch(event.request)
		})
	)
})

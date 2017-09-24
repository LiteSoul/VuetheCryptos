const filesToCache = [
	'/',
	'/index.html',
	'/manifest.json',
	'https://gitcdn.link/cdn/Chalarangelo/mini.css/930b613d293f5cf02fe3f31efcadc7499b4f396f/dist/mini-dark.min.css',
	'https://cdnjs.cloudflare.com/ajax/libs/vue/2.4.2/vue.min.js',
	'https://unpkg.com/axios@0.16.2/dist/axios.min.js',
	'https://d33wubrfki0l68.cloudfront.net/bundles/f1ef12beff9e925aa274728df660cbcb6349e103.js',
	'/app.min.js',
	'/call-sw.js',
	'sw.js',
	'favicon-32x32.png',
	'android-icon-192x192.png',
	'logo.png'
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

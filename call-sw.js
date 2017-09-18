if ('serviceWorker' in navigator) {
	// Recommended to register onLoad
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/sw.js')
	})
}

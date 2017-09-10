// coinmarketcap API
let coinMarketCap = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'

let app = new Vue({
	el: '#app',
	data: {
		coins: [],
		coinData: {}
	},
	methods: {
		/**
     * Get the top 10 cryptocurrencies by value.  This data is refreshed each 5
     * minutes by the backing API service.
     */
		getCoins: function() {
			axios
				.get(coinMarketCap)
				.then(resp => {
					this.coins = resp.data
				})
				.catch(err => {
					console.error(err)
				})
		},
		/**
     * Given a cryptocurrency ticket symbol, return the currency's logo
     * image.
     */
		// getCoinImage: function(symbol) {
		// 	return CRYPTOCOMPARE_API_URI + this.coinData[symbol].ImageUrl
		// },
		getCoinImage: function(id) {
			return (
				'https://files.coinmarketcap.com/static/img/coins/16x16/' + id + '.png'
			)
		},
		/**
     * Return a CSS color (either red or green) depending on whether or
     * not the value passed in is negative or positive.
     */
		getColor: num => {
			return num > 0 ? 'color:green;' : 'color:red;'
		},

		marketCap: n => {
			return n.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
		}
	},
	/**
	 * Using this lifecycle hook, we'll populate all of the cryptocurrency data as
	 * soon as the page is loaded a single time.
	 */
	created: function() {
		this.getCoins()
	}
})

/**
 * Once the page has been loaded and all of our app stuff is working, we'll
 * start polling for new cryptocurrency data every minute.
 *
 * This is sufficiently dynamic because the API's we're relying on are updating
 * their prices every 5 minutes, so checking every minute is sufficient.
 */
setInterval(() => {
	app.getCoins()
}, 60 * 1000)

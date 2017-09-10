// coinmarketcap API
const coinMarketCap = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'

let app = new Vue({
	el: '#app',
	data: {
		coins: []
	},
	methods: {
		//Get the 10 cryptocurrencies from API
		getCoins: function() {
			axios
				.get(coinMarketCap)
				.then(resp => {
					this.coins = resp.data
				})
				.catch(err => {
					return err
				})
		},
		//Get png image of coind from it's ID
		getCoinImage: function(id) {
			return (
				'https://files.coinmarketcap.com/static/img/coins/16x16/' + id + '.png'
			)
		},
		//Makes numbers green or red depending on if it's positive or negative
		getColor: num => {
			return num > 0 ? 'color:green;' : 'color:red;'
		},
		//Converts raw numbers in currency friendly
		currencyConv: n => {
			return n.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
		}
	},
	//Lifecycle hook 'created' to execute once page loads html
	created: function() {
		this.getCoins()
	}
})

//Updating data every 1 minute (API updates every 5 minutes)
setInterval(() => {
	app.getCoins()
}, 60 * 1000)

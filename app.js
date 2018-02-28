// coinmarketcap API
const coinMarketCap = 'https://api.coinmarketcap.com/v1/ticker/?limit=10'

let app = new Vue({
	el: '#app',
	data: {
		coins: []
	},
	methods: {
		//Get the top 10 cryptocurrencies from API
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
		//Get png image of coin from it's ID
		getCoinImage: id =>
			`https://www.barchart.com/img/crypto-icons/${id}.png`,
		//Get coinmarketcap coin link from it's ID
		getCoinLink: id => `https://coinmarketcap.com/currencies/${id}/`,
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

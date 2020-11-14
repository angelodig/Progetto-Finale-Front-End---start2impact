
const APIKEY = "a133d6927fmsh03afcde706a5132p1d0ed3jsn3311cb658405"

getLastInfoBitcoin()

// Methods
//Request
function getLastInfoBitcoin() {
  fetch("https://coingecko.p.rapidapi.com/coins/bitcoin?developer_data=false&market_data=true&sparkline=false&community_data=false&tickers=true", {
	   "method": "GET",
	   "headers": {
       "x-rapidapi-key": APIKEY,
	     "x-rapidapi-host": "coingecko.p.rapidapi.com"
    }
  })
.then(response => response.json())
.then(data => {
  console.log(data);
  showResultRequest(data)
  savePriceBtc(data.market_data.current_price.usd)
})
.catch(err => {
	console.error(err);
  labelFeedbackError()
});
}

//Save price in Usd
function savePriceBtc(price) {
  localStorage.setItem("btcUsdPrice", price)
}

//Show request result
function showResultRequest(data) {
  const btcPriceLabel = document.getElementById("btcPrice")
  btcPriceLabel.textContent = data.market_data.current_price.usd

  const h24ChangeLabel = document.getElementById("h24PriceChange")
  var h24Data = data.market_data.price_change_percentage_24h_in_currency.usd
  h24ChangeLabel.textContent = round2Decimal(h24Data) + "%"
  changeColorNumber(h24Data, h24ChangeLabel)
}

function labelFeedbackError() {
  const btcPriceLabel = document.getElementById("btcPrice")
  btcPriceLabel.textContent = "-"
  const h24ChangeLabel = document.getElementById("h24PriceChange")
  h24ChangeLabel.textContent = "-"
}

//Text style
function round2Decimal(value)  {
  return value.toFixed(2)
}

function changeColorNumber(value, idElement) {
  if (value > 0) {
    idElement.style.color = "green"
  } else if (value < 0) {
    idElement.style.color = "red"
  } else {
    idElement.style.color = "black"
  }
}

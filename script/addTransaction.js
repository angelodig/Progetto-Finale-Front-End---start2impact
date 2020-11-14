
updateYourBalance()

//Save Transaction
const saveBtn = document.getElementById("buttonSave")
saveBtn.addEventListener("click", function(event) {
  var bitcoinAmount = document.getElementsByName("bitcoinAmount")[0].value
  if (bitcoinAmount != 0) {
    if(typeof(Storage) !== "undefined") {
        addBitcoinLocalstorage(getKeyLocalStorage(), bitcoinAmount)
        updateYourBalance()
        resetInput()
    } else {
        alert("Not supported")
    }
  }
})

//Add Transaction to Local Storage
function addBitcoinLocalstorage(keyLocalStorage, bitcoinAmount) {
    strAmountLocalStorage = localStorage.getItem(keyLocalStorage)
    if (strAmountLocalStorage == null || strAmountLocalStorage == "null" || strAmountLocalStorage == "NaN") {
      amount = 0.00
    } else {
      amount = parseFloat(strAmountLocalStorage)
    }
    var totalAmount = amount + parseFloat(bitcoinAmount)
    if (totalAmount < 0) {
      totalAmount = 0
    }
    localStorage.setItem(keyLocalStorage, totalAmount)
}

function resetInput() {
  var bitcoinAmount = document.getElementById("bitcoinAmountInput")
  bitcoinAmount.value = bitcoinAmount.defaultValue
}

function getKeyLocalStorage() {
  const key = "yourBitcoin"
  return key
}

function updateYourBalance() {
  const totalBitcoin = localStorage.getItem(getKeyLocalStorage())

  const yourBitcoinLbl = document.getElementById("yourBitcoin")
  if (isNaN(totalBitcoin) === true) {
    yourBitcoinLbl.textContent = "0"
  } else {
    yourBitcoinLbl.textContent = totalBitcoin
  }

  const btcPriceLbl = localStorage.getItem("btcUsdPrice")
  const currentValue = document.getElementById("currentValue")
  if (isNaN(totalBitcoin) === true) {
    currentValue.textContent = "0"
  } else {
    currentValue.textContent = (parseFloat(totalBitcoin) * parseFloat(btcPriceLbl)).toFixed(2) + " $"
  }
}

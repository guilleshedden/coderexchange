const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currencyCode in countryList){
        let selected = i == 0 ? currencyCode == "USD" ? "selected" : "" : currencyCode == "ARS" ? "selected" : "";
        let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(let code in countryList){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img")
            imgTag.src = `https://flagcdn.com/24x18/${countryList[code]}.png`
            
        }
    }
}
window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})


function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    exchangeRateTxt.innerText = "Obteniendo conversión...";
    let url = `https://v6.exchangerate-api.com/v6/850d2e44dbe796664f621ea8/latest/${fromCurrency.value}`;
    fetch(url)
    .then(response => response.json())
    .then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Algo salió mal... estamos trabajando en ello.";
    });
}
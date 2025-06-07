const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const currencyForm = document.getElementById("currency-form");
const result = document.querySelector(".result");


const currency = new Currency();


runEventListener();

window.addEventListener("DOMContentLoaded", () => {
    amountInput.value = "";
});

function runEventListener() {
    currencyForm.addEventListener("submit",exchangeCurrency);
}

function exchangeCurrency(e) {
    const amount = Number(amountInput.value.trim());
    const firstOptionValue = fromCurrency.options[fromCurrency.selectedIndex].value;
    const secondOptionValue = toCurrency.options[toCurrency.selectedIndex].value;

    currency.exchange(amount, firstOptionValue, secondOptionValue).then(rate => {
        updateResult(amount, firstOptionValue, secondOptionValue, rate);
    }).catch(err => {
        console.error("Error fetching exchange rate:", err);
        result.innerHTML = `<h5 class="text-danger">Döviz kuru alınırken hata oluştu. Lütfen daha sonra tekrar deneyiniz.</h5>`;
    });
    e.preventDefault();
}

function updateResult(amount, from, to, rate) {
    result.innerHTML = `
        <h5>${amount} ${from} = <span class="font-weight-bold text-primary">${(amount * rate).toFixed(3)} ${to}</span></h5>
        <small class="text-muted">1 ${from} = ${rate.toFixed(3)} ${to}</small>
    `;
}



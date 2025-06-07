const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const currencyForm = document.getElementById("currency-form");
const result = document.querySelector(".result");
const currencyListContainer = document.getElementById('live-currency-list');
const baseCurrency = document.getElementById('base-currency');
const refreshButton = document.getElementById('refresh-btn');

const currencyOptions = [
    { code: "USD", name: "Amerikan Doları" },
    { code: "EUR", name: "Euro" },
    { code: "TRY", name: "Türk Lirası" },
    { code: "GBP", name: "İngiliz Sterlini" },
    { code: "JPY", name: "Japon Yeni" },
    { code: "CNY", name: "Çin Yuanı" },
    { code: "RUB", name: "Rus Rublesi" },
    { code: "AUD", name: "Avustralya Doları" },
    { code: "INR", name: "Hindistan Rupisi" }
];

const currencies = [
    { code: "TRY", name: "Türk Lirası", flag: "₺" },
    { code: "USD", name: "Amerikan Doları", flag: "$" },
    { code: "EUR", name: "Euro", flag: "€" },
    { code: "GBP", name: "İngiliz Sterlini", flag: "£" },
    { code: "JPY", name: "Japon Yeni", flag: "¥" },
    { code: "AUD", name: "Avustralya Doları", flag: "A$" },
    { code: "CNY", name: "Çin Yuanı", flag: "¥" },
    { code: "INR", name: "Hindistan Rupisi", flag: "₹" },
    { code: "RUB", name: "Rus Rublesi", flag: "₽" }
];
const popularPairs = [
    { pair: "EUR/USD", from: "EUR", to: "USD" },
    { pair: "USD/TRY", from: "USD", to: "TRY" },
    { pair: "TRY/USD", from: "TRY", to: "USD" },
    { pair: "GBP/EUR", from: "GBP", to: "EUR" }
];

const currency = new Currency();


runEventListener();

window.addEventListener("DOMContentLoaded", () => {
    fillCurrencySelect("from-currency", "USD");
    fillCurrencySelect("to-currency", "TRY");
    fillCurrencySelect("base-currency", "USD");
    amountInput.value = "";
    renderLiveCurrencies(baseCurrency.value);
    renderPopularCrossRates();
});

function runEventListener() {
    currencyForm.addEventListener("submit",exchangeCurrency);
    baseCurrency.addEventListener("change", function() {
    renderLiveCurrencies(baseCurrency.value);
});

    refreshButton.addEventListener('click', () => {
    renderLiveCurrencies(baseCurrency.value);
    renderPopularCrossRates();
});

    fromCurrency.addEventListener("change", updateLastUpdateTime);
}
function fillCurrencySelect(selectId, defaultValue) {
    const select = document.getElementById(selectId);
    select.innerHTML = currencies.map(opt =>
        `<option value="${opt.code}"${opt.code === defaultValue ? " selected" : ""}>${opt.name} (${opt.code})</option>`
    ).join('');
}

function updateLastUpdateTime() {
    const lastUpdate = document.getElementById('last-update');
    const now = new Date();
    const timeStr = now.toLocaleTimeString('tr-TR', { hour12: false });
    lastUpdate.textContent = `Son güncelleme: ${timeStr}`;
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
    console.log(rate);
    result.innerHTML = `
        <h5>${amount} ${from} = <span class="font-weight-bold text-primary">${(rate).toFixed(3)} ${to}</span></h5>
        <small class="text-muted">1 ${from} = ${(rate / amount).toFixed(3)} ${to}</small>`;
}

async function renderLiveCurrencies(base = baseCurrency.value) {
    currencyListContainer.innerHTML = "Yükleniyor...";
    try {
        const data = await currency.getLiveCurrenciesWithChange(currencies, base);
        currencyListContainer.innerHTML = data.map(cur => `
            <div class="col-12 col-sm-6 col-md-4 mb-3">
                <div class="live-currency">
                    <span class="currency-flag">${cur.flag}</span>
                    <div class="currency-info">
                        <span class="currency-title">${cur.code}</span>
                        <span class="currency-subtitle">${cur.name}</span>
                    </div>
                    <div class="currency-value-group">
                        <span class="currency-value">${cur.current?.toFixed(2) ?? "-"}</span>
                        <span class="currency-change ${cur.changeClass}">
                            ${cur.icon} ${cur.change !== null ? cur.change + "%" : "-"}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
        updateLastUpdateTime();
    } catch (err) {
        currencyListContainer.innerHTML = `<div class="text-danger">Kurlar alınamadı.</div>`;
    }
}

async function renderPopularCrossRates() {
    const tbody = document.querySelector('.popular-cross-table tbody');
    tbody.innerHTML = "<tr><td colspan='3'>Yükleniyor...</td></tr>";
    const rates = await currency.getPopularCrossRates(popularPairs);
    tbody.innerHTML = rates.map(item => `
        <tr>
            <td>${item.pair}</td>
            <td>${item.rate}</td>
            <td class="text-right ${item.changeClass}">
                ${item.icon} ${item.change !== '-' ? item.change + '%' : '-'}
            </td>
        </tr>
    `).join('');
}

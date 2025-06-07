class Currency {
    constructor() {
        this.apiKey = "YOUR_API_KEY"; // BURAYA KENDİ API anahtarınızı girin
        this.baseUrl = "https://api.freecurrencyapi.com/v1";
    }

    async exchange(amount, firstCurrency, secondCurrency) {
        const response = await fetch(`${this.baseUrl}/latest?apikey=${this.apiKey}&base_currency=${firstCurrency}`);
        const result = await response.json();
        const exchangedCurrency = amount * result.data[secondCurrency];
        if (!response.ok) throw new Error("API hatası");
        return exchangedCurrency;
    }

    async fetchLiveRates(base) {
        const response = await fetch(`${this.baseUrl}/latest?apikey=${this.apiKey}&base_currency=${base}`);
        if (!response.ok) throw new Error("API hatası");
        const result = await response.json();
        return result;
    }

    async fetchHistoricalRates(base, date) {
        const url = `${this.baseUrl}/historical?apikey=${this.apiKey}&base_currency=${base}&date=${date}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("API hatası");
        const result = await response.json();
        return result;
    }

    async getLiveCurrenciesWithChange(currencies, base) {
        const todayData = await this.fetchLiveRates(base);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yyyy = yesterday.getFullYear();
        const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
        const dd = String(yesterday.getDate()).padStart(2, '0');
        const yesterdayStr = `${yyyy}-${mm}-${dd}`;

        const historicalData = await this.fetchHistoricalRates(base, yesterdayStr);

        return currencies.map(cur => {
            const current = todayData.data[cur.code];
            const previous = historicalData.data[yesterdayStr]?.[cur.code];
            let change = null, changeClass = '', icon = '';
            if (current && previous) {
                change = ((current - previous) / previous) * 100;
                changeClass = change >= 0 ? 'text-success' : 'text-danger';
                icon = change >= 0 ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>';
            }
            return {
                ...cur,
                current,
                change,
                changeClass,
                icon
            };
        });
    }

    async getPopularCrossRates(pairs) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yyyy = yesterday.getFullYear();
        const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
        const dd = String(yesterday.getDate()).padStart(2, '0');
        const yesterdayStr = `${yyyy}-${mm}-${dd}`;

        const todayRes = await this.fetchLiveRates("USD");
        const yesterdayRes = await this.fetchHistoricalRates("USD", yesterdayStr);

        return pairs.map(pair => {
            const todayFrom = todayRes.data[pair.from];
            const todayTo = todayRes.data[pair.to];
            const yesterdayFrom = yesterdayRes.data[yesterdayStr]?.[pair.from];
            const yesterdayTo = yesterdayRes.data[yesterdayStr]?.[pair.to];

            let todayRate = todayTo / todayFrom;
            let yesterdayRate = yesterdayTo / yesterdayFrom;
            let change = null, changeClass = '', icon = '';

            if (todayRate && yesterdayRate) {
                change = ((todayRate - yesterdayRate) / yesterdayRate) * 100;
                changeClass = change >= 0 ? 'text-success' : 'text-danger';
                icon = change >= 0 ? '<i class="fas fa-arrow-up"></i>' : '<i class="fas fa-arrow-down"></i>';
            }

            return {
                pair: pair.pair,
                rate: todayRate ? todayRate.toFixed(4) : '-',
                change: change !== null && isFinite(change) ? change.toFixed(2) : '-',
                changeClass,
                icon
            };
        });
    }
}

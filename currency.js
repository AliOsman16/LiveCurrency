class Currency{
    constructor(){
        this.url = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_yq3pW9CjlZdNpBh7FEefsuY77EPNhKvMpv3E6UUl&base_currency=";
    }

    async exchange(amount, firstCurrency, secondCurrency){
        const response = await fetch(`${this.url}${firstCurrency}`);
        const result = await response.json();
        const exchangedCurrency = amount * result.data[secondCurrency];
        console.log(exchangedCurrency);

        return exchangedCurrency;
    }
}
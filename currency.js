// document.addEventListener('DOMContentLoaded', function () {
//     const amountInput = document.getElementById('amount');
//     const convertedInput = document.getElementById('convert');
//     const currencyFrom = document.querySelector('.amount-container select');
//     const currencyTo = document.querySelector('.convert-container select');
//     const exchangeRateDisplay = document.querySelector('.rate');

//     // const apiKey = ' 0c19117b4648e55989716fb4'; 
    

//     async function testAPI(){
//         const apiUrl = 'https://v6.exchangerate-api.com/v6/0c19117b4648e55989716fb4/latest/USD';
//         let response = await fetch(apiUrl)
//         let jsonRes = await response.json();
//         console.log(jsonRes);
//     }

//     testAPI();
    // Fetch exchange rates
    // async function fetchExchangeRate(baseCurrency) {
    //     try {
    //         const response = await fetch(`${apiUrl}${baseCurrency}`);
    //         const data = await response.json();
    //         return data.conversion_rates;
    //     } catch (error) {
    //         console.error('Error fetching exchange rates:', error);
    //     }
    // }

    // console.log(fetchExchangeRate(1000));
//     async function convertCurrency() {
//         const amount = parseFloat(amountInput.value);
//         const fromCurrency = currencyFrom.value;
//         const toCurrency = currencyTo.value;

//         if (isNaN(amount)) {
//             alert('Please enter amount');
//             return;
//         }

//         const conversionRates = await fetchExchangeRate(fromCurrency);

//         if (conversionRates) {
//             const rate = conversionRates[toCurrency];
//             const convertedAmount = (amount * rate).toFixed(2);

//             exchangeRateDisplay.textContent = rate;
//             convertedInput.value = convertedAmount;
//         }
//     }

//     // Update the converted value when any input changes
//     amountInput.addEventListener('input', convertCurrency);
//     currencyFrom.addEventListener('change', convertCurrency);
//     currencyTo.addEventListener('change', convertCurrency);

//     // Initial conversion when the page loads
//     convertCurrency();


let inputAmount = document.getElementById('input');
let outputAmount = document.getElementById('output').value;
let inputCurrency = document.getElementsByClassName('custom-select')[0].children[0];
let outputCurrency = document.getElementsByClassName('custom-select')[1].children[0];
let display = document.getElementsByClassName('amount-equated')[0].children;
let convert = document.getElementsByTagName('button')[1];
async function convertCurrency(){
    const apiUrl = 'https://v6.exchangerate-api.com/v6/0c19117b4648e55989716fb4/latest/USD';
    let response = await fetch(apiUrl)
    let jsonRes = await response.json();
    let inCurrency = inputCurrency[inputCurrency.selectedIndex].textContent.slice(-4, -1);
    let outCurrency = outputCurrency[outputCurrency.selectedIndex].textContent.slice(-4, -1);

    // 1 USD = 1560 NGN
    // 1 USD = 2500 YEN
    // 1560 NGN = 2500 YEN
    // 23 NGN = X YEN
    // X NGN = (2500 YEN * 23 NGN)/1560 NGN
    // console.log(inCurrency)
    // console.log(jsonRes.conversion_rates[inCurrency]);
    // (jsonRes.conversion_rates[outCurrency] * inputAmount.value) / jsonRes.conversion_rates[inCurrency]
    let output = (jsonRes.conversion_rates[outCurrency] * inputAmount.value) / jsonRes.conversion_rates[inCurrency];
    // console.log(jsonRes.conversion_rates[outCurrency] * inputAmount.value)
    // outputAmount.setAttribute('value', Math.trunc(output));
    display[1].innerText = inputAmount.value + ' ' + inCurrency + ' =';
    display[2].innerText = ' ' + Math.trunc(output) + ' ' +outCurrency;
}

// console.log(display[2].textContent)
convert.addEventListener('click', function(){
    convertCurrency();
    // console.log(outputCurrency[outputCurrency.selectedIndex].textContent.slice(-4, -1))
    // console.log(display[1])
})
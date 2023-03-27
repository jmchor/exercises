// index.js

const getCountryInfo = (countryName) => {
        axios.get(`https://restcountries.com/v2/name/${countryName}`)
                .then((response) => {
                        const countryDetail = response.data[0];
                        document.getElementById('country-name').innerText = countryDetail.name;
                        document.getElementById('country-capital').innerText = countryDetail.capital;
                        document.getElementById(
                                'country-currency'
                        ).innerText = `Currency: ${countryDetail.currencies[0].name}`;
                        document.getElementById('country-flag').setAttribute('src', countryDetail.flag);
                })
                .catch((err) => {
                        console.log(err);
                        err.response.status === 404
                                ? alert(`The country ${countryName} doesn't exist.`)
                                : alert('Server error! Sorry.');
                });
};

document.getElementById('get-country-btn').addEventListener('click', () => {
        const userInput = document.getElementById('country-name-input').value;
        getCountryInfo(userInput);
});

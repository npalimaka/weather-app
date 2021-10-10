/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = 'cb2e281a2c64a17d1fa3fe2d3a36f8ef';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

document.getElementById('generate').addEventListener('click', generateData);

function generateData() {
    const userInput = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;

    // Operations to backend should be done only when here is user input
    if (!zipCode) {
        alert('Please enter zip code');
    }

    if (!userInput) {
        alert('Please enter your feelings');
    }

    if (zipCode && userInput) {
        getWeather(baseURL, zipCode, apiKey)
            .then(data => {
                postData('/add', {
                    date: newDate,
                    temperature: data.temp,
                    userResponse: userInput
                })
                    .then(getData());
            }, err => alert(err))
    }
}

const getWeather = async (baseURL, zip, key) => {

    const res = await fetch(`${baseURL}${zip}&units=imperial&appId=${key}`)
    try {
        const data = await res.json();
        return checkResponse(data);
    } catch (error) {
        const message = error ? error : '';
        throw(`Something bad had happened! ${message}`);
    }
}

const postData = async (url = '', data = {}) => {
    const settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    try {
        const res = await fetch(`${url}`, settings);
        return await res.json();
    } catch (error) {
        const message = error ? error : '';
        return alert(`Problem with POST request! ${message}`);
    }
}

const getData = async () => {
    const req = await fetch('/recent');
    try {
        const data = await req.json();
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}`;
        document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`;
    } catch (error) {
        const message = error ? error : '';
        alert(`Problem with GET request! ${message}`);
    }
}

function checkResponse(res) {
    if (!res.main) {
        throw `Response has no data. ${res.message} `;
    } else {
        return res.main;
    }
}

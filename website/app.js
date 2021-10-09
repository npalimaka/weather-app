/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = 'cb2e281a2c64a17d1fa3fe2d3a36f8ef';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', generateData);

function generateData(){
    const userInput = document.getElementById('feelings').value;
    const zipCode =  document.getElementById('zip').value;
    getWeather(baseURL,zipCode, apiKey).then(data => {
        console.log('Return', data);
        postData('/add', {date: newDate, temperature: data.temp, userResponse: userInput}).then(getData());
    })

}
const getWeather = async (baseURL, zip, key)=> {

    const res = await fetch(`${baseURL}${zip}&appId=${key}`)
    try {
        const data = await res.json();
        console.log(data)
        return data.main;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const postData = async (url = '', data = {}) => {
    const location = window.location.hostname;
    const settings = {
        method: 'POST',
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };
    try {
        const res = await fetch(`http://${location}:3000/add`, settings);
        return await res.json();
    } catch (e) {
        return e;
    }
}

const getData = async () => {
    const req = await fetch('recent');
    try {
        const data = await req.json();
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${data.temperature}`;
        document.getElementById('content').innerHTML = `Feelings: ${data.userResponse}`;
    } catch (error) {
        console.log('error: ', error);
    }
}

getData('/recent').then( data => console.log(data));
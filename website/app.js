/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = 'cb2e281a2c64a17d1fa3fe2d3a36f8ef';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', generateData);

function generateData(){
    const zipCode =  document.getElementById('zip').value;
    getWeather(baseURL,zipCode, apiKey).then(data => {
        console.log('Return', data);
        postData('/add', {date: newDate, temperature: 'test', userResponse: 'test'});
    })

}
const getWeather = async (baseURL, zip, key)=>{

    const res = await fetch(`${baseURL}${zip}&appId=${key}`)
    try {

        const data = await res.json();
        console.log(data)
        return data;
    }  catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

const postData = async (url = '', data = {}) => {
    console.log('start post', url, data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type ': 'application/json'},
        body: JSON.stringify(data)
    });

    try {
        const newRecord = await res.json();
        console.log(newRecord);
        return newRecord;
    } catch (error) {
        console.log('error: ', error);
    }
}

const getData = async (url) => {
    const res = await fetch(url);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log('error: ', error);
    }
}

getData('/recent').then( data => console.log(data));
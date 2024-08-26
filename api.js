
const api_key="04df85ba80e753a16d702505b7675923";


async function getWeather() {

    const city= document.getElementById('cityInput').value;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&unit=metric`;
     
    try{
        const response =await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data= await response.json();
        displayWeather(data);
    }
    catch(error){
        console.log('failed to fetch data:',error.message);
        alert('Error failed to fetch weather data.');
    }
    
} 
function displayWeather(data)
{
    const{main:{temp,humidity},weather,wind:{speed},sys:{country},name}=data;
    const [{main: weatherMain,description,icon}]=weather;

    if(data.cod !==200){
        weatherDisplay.innerHTML=`<p> Error:${data.message}</p>`
        return;
    }
    const weatherHTML=`
        <h2>Weather in ${name},${country}</h2>
        <p>Temperature:${temp} <sup>o</sup>F</p>
        <p>Weather:${weatherMain} (${description})</p>
        <p>Humidity:${humidity}%</p>
        <p>Wind :${speed}m/s </p>
        <img src="https://openweathermap.org/img/w/${icon}.png" alt="Weather icon"
    `;
    document.getElementById('weatherDisplay').innerHTML = weatherHTML;
}
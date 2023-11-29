function formatDate(date)
{
    let hours=date.getHours();
    let mins=date.getMinutes();
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    let day=days[date.getDay()];
    if(mins<10)
    {
        mins=`0${mins}`;
    }
    return `${day} ${hours}:${mins}`

}

function refreshWeather(response)
{
let temperatureElement=document.querySelector("#temperature");
let cityElement=document.querySelector("#city");
let descriptionElement=document.querySelector("#description");
let humidityElement=document.querySelector("#humidity");
let windElement=document.querySelector("#wind-speed");
let timeElement=document.querySelector("#time");
let date=new Date(response.data.time *1000);
let temperature=response.data.temperature.current;
let iconElement=document.querySelector("#icon");


cityElement.innerHTML=response.data.city;
temperatureElement.innerHTML=Math.round(temperature);
humidityElement.innerHTML=response.data.temperature.humidity;
windElement.innerHTML=response.data.wind.speed;
descriptionElement.innerHTML=response.data.condition.description;
timeElement.innerHTML=formatDate(date);
iconElement.innerHTML= `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`
}

function searchCity(city)
{
    //make an api call and update the interface 
    let apiKey="69aoab601t0ee004cd83d99857f5173e";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather)
}
function handleSearchSubmit(event)
{
    event.preventDefault();
    let searchInput=document.querySelector("#search-form-input");
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML=searchInput.value;
    searchCity(searchInput.value);
}
let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

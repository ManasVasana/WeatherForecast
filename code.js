async function getweather(city) {
    // Extracting data from API
    const apikey='5b7e7035106792fcc042966dc4ebf498';
    const currentweatherurl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apikey}`
    const response=await fetch(currentweatherurl);
    
    // Checking for an error
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector('.error').innerHTML='Please enter a valid city name';
        document.querySelector(".weather_details").style.display = "none";
    } 
    else {
        document.querySelector(".weather_details").style.display = "block";
        document.querySelector(".error").style.display = "none";
        var data=await response.json();
        
        // Obtaining weather icon from API
        const iconCode=data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        // Obtaining weather description from API
        var description=data.weather[0].description;
        var Description=description.charAt(0).toUpperCase() + description.slice(1);
        // Obtaining Maximum and Minimum temperature of the day from API
        var max_temp=Math.ceil(data.main.temp_max);
        var min_temp=Math.floor(data.main.temp_min);
        
        // Updating the data to html document
        document.querySelector('#temperature').innerHTML=Math.round(data.main.temp) + '°C';
        document.querySelector('#weatherinfo').innerHTML=Description;
        document.querySelector('#cityname').innerHTML=data.name;
        document.querySelector('#minmaxtemp').innerHTML=max_temp + '°C/' + min_temp + '°C';
        document.querySelector('#humidity').innerHTML=data.main.humidity + '%';
        document.querySelector('#wind').innerHTML=data.wind.speed + 'km/h';
        weatherIcon.src=iconUrl;  

        // Changing the display style of wind and humidity elements to Block
        document.querySelector(".text").style.display = "block";
        document.querySelector(".images").style.display = "block";
        document.querySelector(".image").style.display = "block";
        document.querySelector(".text1").style.display = "block"; 
    }
}

const searchbtn=document.querySelector('#search');
var weatherIcon=document.querySelector('#weathericon');

// Code that first gets implemented when users searches for a city
searchbtn.addEventListener("click",()=>{const city=document.getElementById('city').value;getweather(city)});


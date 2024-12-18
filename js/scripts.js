<!-- weather javascript -->
let city = document.querySelector('.cityname');
let btn = document.querySelector('.btn');
let locBtn = document.querySelector('.locBtn');
let output = document.getElementById('output');
let n = 0;

// Javascript Program to convert Temperature 
// from Celsius to Fahrenheit
 
// function to convert Celsius
// to Fahrenheit
function celcToFahr( n ) {
  return ((n * 9.0 / 5.0) + 32.0);
}

btn.addEventListener('click',checkWeather);

function checkWeather(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city.value
          +'&units=metric&appid=1ebc5861bba83e0214cd8df3b995ffca')
    .then(response => response.json())
    .then(data =>{
        console.log(celcToFahr(data['main']['temp'] ));
        console.log(data);
        output.innerHTML = Number(celcToFahr(data['main']['temp']).toFixed(1))+ '°F in: '+data['name']+`<br>`+data['weather'][0]['description'];
        output.style.cssText ='background:#ffffe5; text-align:center; width:200px;'    
    })
    .catch(err=>alert("error"));
}

locBtn.addEventListener('click',showPosition);
function showPosition() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            // document.getElementById("lat").innerHTML = lat;
            // document.getElementById("lon").innerHTML = lon;
            fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&appid=1ebc5861bba83e0214cd8df3b995ffca')
            .then(response => response.json())
            .then(data =>{
                output.innerHTML =`<h1>`+ data['main']['temp']+'°F and Location: ' +data['name']+`<br>`+data['weather'][0]['description']+`</h1>`;
                output.style.cssText ='background:#c3ffe5; text-align:center; width:150px;'    
    })
    .catch(err=>alert("error"));

        });

    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }
}


var api_key = "34ae443d7f77a0f1ebf8414b2ca36d40";
var celsius = false;
var weatherData;

function displayTemp(fTemp, c){
  if(c) return Math.round((fTemp - 32) * (5/9)) + "&#8451;";
  return Math.round(fTemp) + "&#8457;";
}

function render(weatherData, celsius){
       
      var currentLocation = weatherData.name;
      var currentWeather = weatherData.weather[0].description;
      var currentTemp = displayTemp(weatherData.main.temp, celsius);
      var high = displayTemp(weatherData.main.temp_max, celsius);
      var low = displayTemp(weatherData.main.temp_min, celsius);

      $('#currentLocation').html(currentLocation);
      $('#currentTemp').html(currentTemp);
      $('#currentWeather').html(currentWeather);
      $('#high-low').html(high + " / " + low);
}

$(function(){
  
 var loc;
  $.getJSON('http://ipinfo.io', function(d){
    console.log('data assign: ')
    loc = d.loc.split(",");
    console.log(loc);
    
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?units=imperial&lat='
              + loc[0] + '&lon=' + loc[1] + '&APPID=' + api_key, function(apiData){
      weatherData = apiData;
      
      render(apiData, celsius);
      
      $('#toggle').click(function(){
        celsius = !celsius;
        render(weatherData, celsius);
      })
      
    })
    
  })

})

var lat;
var lon;
var unitSystem = "metric";

$(document).ready(function() {
  var getData = function(data) {
    var icon = data.weather[0].icon;
    var icon_url = "http://openweathermap.org/img/w/" + icon + ".png";
    var tempC = Math.round(data.main.temp * 100) / 100 + " °C";
    var tempF = Math.round(((9 / 5) * data.main.temp + 32) * 100) / 100 + " °F";
    $("#city").html(data.name + ", " + data.sys.country);
    $("#weatherType").html(data.weather[0].description);
    document.getElementById('weatherIcon').src = icon_url;
    $(".unitF").hide();
    $(".unitC").html(tempC).show();
    $(".unitC").click(function() {
      $(".unitC").hide();
      $(".unitF").html(tempF).show();
    })

    $(".unitF").click(function() {
      $(".unitF").hide();
      $(".unitC").html(tempC).show();
    })

  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=b1b15e88fa797225412429c1c50c122a&units=" + unitSystem;
      $.getJSON(url, getData, 'json');
    });

  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
})
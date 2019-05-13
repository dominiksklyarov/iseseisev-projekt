$(document).ready(function() {
  // weather stuff

  const clearDayBackground = "backgrounds/clear-day.jpg";
  const clearNightBackground = "backgrounds/clear-night.jpg";
  const rainyBackground = "backgrounds/rainy.jpg";
  const snowyBackground = "backgrounds/snowy.jpg";
  const sleetyBackground = "backgrounds/sleety.jpg";
  const windyBackground = "backgrounds/windy.jpg";
  const cloudyBackground = "backgrounds/cloudy.jpg";
  const foggyBackground = "backgrounds/foggy.jpg";
  const partlyCloudyNightBackground = "backgrounds/partly-cloudy-night.jpg";
  const partlyCloudyDayBackground = "backgrounds/partly-cloudy-day.jpg";
  const hailyBackground = "backgrounds/haily.jpg";
  const thunderstormBackground = "backgrounds/thunderstorm.jpg";

  function weather() {
    var location = document.getElementById("location");
    var apiKey = "8baa4abb2c813aa4db37432e81951aa8";
    var url = "https://api.forecast.io/forecast/";

    navigator.geolocation.getCurrentPosition(success, error);

    // Unix timestamp converter
    function timeConverter(UNIX_timestamp) {
      let a = new Date(UNIX_timestamp * 1000);

      let hour = a.getHours();
      let min = a.getMinutes();
      let time = hour + ":" + min;
      return time;
    }

    function success(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      $.getJSON(url + apiKey + "/" + lat + "," + long + "?callback=?", function(
        data
      ) {
        // get current timezone
        let timeZone = data.timezone;
        // get current temperature and turn it into celsius
        let currentTemp = Math.round((data.currently.temperature - 32) / 1.8);
        // show current weather "summary"
        let currentIcon = data.currently.icon;
        // convert current icon to todayWeatherSummary
        let todayWeatherSummary;
        if (currentIcon == "clear-day") {
          todayWeatherSummary = "Clear";
          $("body").css("background-image", "url(" + clearDayBackground + ")");
        } else if (currentIcon == "clear-night") {
          todayWeatherSummary = "Clear";
          $("body").css(
            "background-image",
            "url(" + clearNightBackground + ")"
          );
        } else if (currentIcon == "rain") {
          todayWeatherSummary = "Rainy";
          $("body").css("background-image", "url(" + rainyBackground + ")");
        } else if (currentIcon == "snow") {
          todayWeatherSummary = "Snowy";
          $("body").css("background-image", "url(" + snowyBackground + ")");
        } else if (currentIcon == "sleet") {
          todayWeatherSummary = "Sleety";
          $("body").css("background-image", "url(" + sleetyBackground + ")");
        } else if (currentIcon == "wind") {
          todayWeatherSummary = "Windy";
          $("body").css("background-image", "url(" + windyBackground + ")");
        } else if (currentIcon == "fog") {
          todayWeatherSummary = "Foggy";
          $("body").css("background-image", "url(" + foggyBackground + ")");
        } else if (currentIcon == "cloudy") {
          todayWeatherSummary = "Cloudy";
          $("body").css("background-image", "url(" + cloudyBackground + ")");
        } else if (currentIcon == "partly-cloudy-night") {
          todayWeatherSummary = "Partly Cloudy";
          $("body").css(
            "background-image",
            "url(" + partlyCloudyNightBackground + ")"
          );
        } else if (currentIcon == "partly-cloudy-day") {
          todayWeatherSummary = "Partly Cloudy";
          $("body").css(
            "background-image",
            "url(" + partlyCloudyDayBackground + ")"
          );
        } else if (currentIcon == "hail") {
          todayWeatherSummary = "Haily";
          $("body").css("background-image", "url(" + hailyBackground + ")");
        } else if (currentIcon == "thunderstorm") {
          todayWeatherSummary = "Thunderstorm";
          $("body").css(
            "background-image",
            "url(" + thunderstormBackground + ")"
          );
        } else {
          todayWeatherSummary = "-";
        }
        // get today minimum
        let todayMinTemp = Math.round(
          (data.daily.data["0"].temperatureLow - 32) / 1.8
        );
        // get today maximum
        let todayMaxTemp = Math.round(
          (data.daily.data["0"].temperatureHigh - 32) / 1.8
        );

        // get current UV index
        let currentUvIndex = data.currently.uvIndex;

        // get current wind and convert it to m/s
        let currentWindOutside = Math.floor(data.currently.windSpeed / 2.237);

        // get current percipient probablity
        let currentPrecipProb = Math.floor(
          data.currently.precipProbability * 100
        );

        // get today sunrise
        let todaySunrise = timeConverter(data.daily.data["0"].sunriseTime);

        // get today sunset
        let todaySunset = timeConverter(data.daily.data["0"].sunsetTime);

        // TOMORROW INFORMATION
        // get tomorrow temperature and turn it into celsius
        let tomorrowTemp = Math.round(
          (data.daily.data["1"].temperatureHigh - 32) / 1.8
        );

        // get tomorrow summary (based on tomorrow icon)
        let tomorrowIcon = data.daily.data["1"].icon;
        // convert current icon to todayWeatherSummary
        let tomorrowWeatherSummary;
        if (tomorrowIcon == "clear-day") {
          tomorrowWeatherSummary = "Clear";
        } else if (tomorrowIcon == "clear-night") {
          tomorrowWeatherSummary = "Clear";
        } else if (tomorrowIcon == "rain") {
          tomorrowWeatherSummary = "Rainy";
        } else if (tomorrowIcon == "snow") {
          tomorrowWeatherSummary = "Snowy";
        } else if (tomorrowIcon == "sleet") {
          tomorrowWeatherSummary = "Sleety";
        } else if (tomorrowIcon == "wind") {
          tomorrowWeatherSummary = "Windy";
        } else if (tomorrowIcon == "fog") {
          tomorrowWeatherSummary = "Foggy";
        } else if (tomorrowIcon == "cloudy") {
          tomorrowWeatherSummary = "Cloudy";
        } else if (tomorrowIcon == "partly-cloudy-night") {
          tomorrowWeatherSummary = "Partly Cloudy";
        } else if (tomorrowIcon == "partly-cloudy-day") {
          tomorrowWeatherSummary = "Partly Cloudy";
        } else if (tomorrowIcon == "hail") {
          tomorrowWeatherSummary = "Haily";
        } else if (tomorrowIcon == "thunderstorm") {
          tomorrowWeatherSummary = "Thunderstorm";
        } else {
          tomorrowWeatherSummary = "-";
        }
        // get tomorrow maximum
        let tomorrowMaxTemp = tomorrowTemp;
        // get tomorrow minimum
        let tomorrowMinTemp = Math.round(
          (data.daily.data["1"].temperatureLow - 32) / 1.8
        );
        //get tomorrow UV index
        let tomorrowUvIndex = data.daily.data["1"].uvIndex;
        // get tomorrow wind
        let tomorrowWind = Math.floor(data.daily.data["1"].windSpeed / 2.237);
        // get tomorrow precipient probability
        let tomorrowPrecipProb = Math.floor(
          data.daily.data["1"].precipProbability * 100
        );

        // get tomorrow sunrise
        let tomorrowSunrise = timeConverter(data.daily.data["1"].sunriseTime);

        // get tomorrow sunset
        let tomorrowSunset = timeConverter(data.daily.data["1"].sunsetTime);

        // BASIC HTML DOM MANIPULATION
        $(".time-zone").html(timeZone);
        // TODAY
        $(".temperature").html(currentTemp + "°C");
        $(".summary").html(todayWeatherSummary);
        $(".today-summary").html(
          "The low today will be " +
            todayMinTemp +
            "°C and the high will be " +
            todayMaxTemp +
            "°C. <br> The UV index is currently " +
            currentUvIndex +
            " and the wind is " +
            currentWindOutside +
            " m/s. <br> It's " +
            currentPrecipProb +
            "% percipitent today."
        );
        $(".sunrise-sunset").html(
          "Sunrise: " + todaySunrise + "&nbsp &nbsp" + "Sunset: " + todaySunset
        );
        // TOMORROW
        $(".temperature-tomorrow").html(tomorrowTemp + "°C");
        $(".summary-tomorrow").html(todayWeatherSummary);
        $(".tomorrow-summary").html(
          "The low tomorrow will be " +
            tomorrowMinTemp +
            "°C and the high will be " +
            tomorrowMaxTemp +
            "°C. <br> The UV index will be " +
            tomorrowUvIndex +
            " and the wind " +
            tomorrowWind +
            " m/s. <br> It's " +
            tomorrowPrecipProb +
            "% percipitent tomorrow."
        );
        $(".sunrise-sunset-tomorrow").html(
          "Sunrise: " +
            tomorrowSunrise +
            "&nbsp &nbsp" +
            "Sunset: " +
            tomorrowSunset
        );
      });

      const today = $(".today");
      const tomorrow = $(".tomorrow");
      $(".today").css("display", "block");
      $(".button").click(function() {
        //check if today is working
        if ($(".today").is(":visible")) {
          today.slideUp(700);
          setTimeout(function() {
            today.hide();
          }, 700);

          setTimeout(function() {
            tomorrow.slideDown(700);
            tomorrow.show();
            $(".button").html("Today");
          }, 1400);
        } else {
          tomorrow.slideUp(700);
          setTimeout(function() {
            tomorrow.hide();
          }, 700);

          setTimeout(function() {
            today.slideDown(700);
            today.show();
            $(".button").html("Tomorrow");
          }, 1400);
        }
      });
    }

    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  }

  weather();
});

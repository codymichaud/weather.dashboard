//Hides any elements that will show once the first search completes
$(".current-box").hide();
$(".forecastBanner").hide();
var displayForecast;

//Function pulls previous cities that were searched from local storage
function allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    } for (j = 0; j < values.length; j++) {
        $(".prev-list").prepend("<button class='prev-city mt-1'>" + values[j] + "</button>");
    }
}

allStorage();

//Clears local storage items and previous searches from page

$(".clear").on("click", function () {
    localStorage.clear();
    $(".prev-city").remove();
});

// Function collects info from weather APIs to display on the page

$(".search").on("click", function () {
    var subject = $(".subject").val();
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + subject + "&appid=3c34658c8e0e9fdb71064b81293a3704";
    var apiURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + subject + "&appid=3c34658c8e0e9fdb71064b81293a3704";
    var lat;
    var lon;
    if (displayForecast === true) {
        $(".forecast-day").remove();
        displayForecast = false;
    }

    //First ajax request collects the current weather data for what ever city was selected. Then it converst the info into what we want to display
    $.ajax({
        url: apiURL,
        method: "GET",
        statusCode: {
            404: function () {
                return;
            }
        }
    }).then(function (response) {
        console.log(response);
        $(">prev-list").prepend("<button class='prev-city mt-1'>" + subject + "</button>");
        localStorage.setItem(subject, subject);
        $(".current-box").show();
        $(">forecastBanner").show();
        var iconCode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        $(".icon").attr("src", iconURL)
        lat = response.coord.lat;
        lon = response.coord.lon;
        $(".currentCity").text(response.name + " " + moment().format("1"));
        var currentTemp = response.main.temp * (9 / 5) - 459.67;
        $(".currentTemps").text("Temperature: " + currentTemp.toFixed(1) + " °F");
        $(".currentHum").text("Humidity: " + response.main.humidity + "%");
        $(".currentWind").text("Humidity" + response.wind.speed + " MPH");
        apiURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?&appid=3c34658c8e0e9fdb71064b81293a3704&lat=" + lat + "&lon=" + lon;

        //This ajax request gets the UV index and uses the previous lat and lon to aqcuire this
        $.ajax({
            url: apiURL,
            method: "GET",
        }).then(function (response) {
            $(".currentUV").text("UV Index: " + response[0].value);
        })
    })

    //This request pulls the weather data for the next 5 days

    $.ajax({
        url: apiURL2,
        method: "GET"
    }).then(function (response) {
        var forecastTimes = response.list;
        for (i = 0; i < forecastTimes.length; i++) {
            if (forecastTimes[i].dt_text[12] === "2") {
                var forecastDate = forecastTimes[i].dt_txt;
                var forecastDateDisplay = forecastDate.charAt(5) + forecastDate.charAt(6) + "/" + forecastDate.charAt(8) + forecastDate.charAt(9) + "/" + forecastDate.charAt(0) + forecastDate.charAt(1) + forecastDate.charAt(2) + forecastDate.charAt(3);
                var forecastIcon = forecastTimes[i].weather[0].icon;
                var forecastIconURL = "http://openweathermap.org/img/w/" + forecastIcon + ".png";
                var forecastTemp = forecastTimes[i].main.temp * (9 / 5) - 459.67;
                var forecastHum = forecastTimes[i].main.humidity;
                if (displayForecast === false || displayForecast === undefined) {
                    $(".forecastList").append("<div class='my-3 pb-3 col-md-2 col-lg-2 forecast-day'>" + "<h5>" + forecastDateDisplay + "<h5>" + "<img class='ficon' src=" + forecastIconURL + " alt='Weather Icon'>" + "<div>Temp: " + forecastTemp.toFixed(1) + " °F" + "</div<div>Humidity: " + forecastHum + "%</div></div></div>");
                }
            }
        }
        displayForecast = true;
    })
});
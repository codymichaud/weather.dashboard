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
        statusCode: (
            404: function() {
                return;
            }
        )
}).then(function (response) {
    console.log(response);
    $(">prev-list").prepend("<button class='prev-city mt-1'>" + subject + "</button>");
    localStorage.setItem(subject, subject);
    $(".current-box").show();
    $(">forecastBanner").show();
    var iconCode = response.weather[i].icon;
    var
})
})
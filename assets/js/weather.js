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
// Select the input, grab the value from the input and then when click button.. append it to the list group
// Use localstorage to keep history persistent

var inputEl = $('#enterCity')
var searchBtn = $('#searchBtn')
var apiKey = '6ee1940a856d17375499153138cc74aa'

function valueApp() {
    var newLi = document.createElement('li');
    var inputVal = inputEl.val();
    newLi.setAttribute('value', inputVal)
    // newLi = inputVal;
    newLi.setAttribute('class', 'listStyle')
    newLi.textContent = inputVal;
    console.log(newLi)
    var cityHistory = $('#cityHistory').append(newLi)
    weatherApi(inputVal)
}

function weatherApi(inputVal) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}`

    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            // console.log(data)
            forecast(data.coord.lat, data.coord.lon)
        })
}


function forecast(lat, lon) {
    var forecastWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

    fetch(forecastWeather)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            var inputName=$()
            $('#weatherName').append()
            $('#temp').append(`<p>Temp: ${data.current.temp} &#176F`)
            $('#wind').append(`<p>Wind: ${data.current.wind_speed} MPH`)
            $('#humidity').append(`<p>Humidity: ${data.current.humidity}%`)
            $('#uvIndex').append(`<p>UV Index: ${data.current.uvi}%`)
        })


}



searchBtn.on('click', valueApp);
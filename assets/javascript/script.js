// Select the input, grab the value from the input and then when click button.. append it to the list group
// Use localstorage to keep history persistent

var inputEl = $('#enterCity')
var searchBtn = $('#searchBtn')
var apiKey = '6ee1940a856d17375499153138cc74aa'
var cityarr = [];


function weatherApi(inputVal) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}`

    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            // console.log(data)
            forecast(data.coord.lat, data.coord.lon)
            fiveDay(data.coord.lat, data.coord.lon)
        })
}


function forecast(lat, lon, inputVal) {
    var forecastWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

    fetch(forecastWeather)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {


            // add inner text to h3 
            $('#weatherName').append(inputEl.val())
            $('#temp').append(`<p>Temp: ${data.current.temp} &#176F`)
            $('#wind').append(`<p>Wind: ${data.current.wind_speed} MPH`)
            $('#humidity').append(`<p>Humidity: ${data.current.humidity}%`)
            $('#uvIndex').append(`<p>UV Index: ${data.current.uvi}%`)


        })


}

function fiveDay(lat, lon) {
    var cast5 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}`

    fetch(cast5)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)

            for (var i = 0; i < 5; i++) {
                var castInfo = {
                    temp: data.daily[i].temp.day,
                    wind: data.daily[i].wind_speed,
                    humidity: data.daily[i].humidity,
                    date: data.daily[i].dt
                };

                var pTime = moment.unix(castInfo.date).format("MM/DD/YYYY");
                // add icon image if wanted

                var cardDisplay = $(`
                <div class="card-group">
                    <div class="card bg-primary">
                        <div class="card-body text-center">
                            <h5>${pTime}</h5>
                            <p>Temp: ${castInfo.temp} °F</p>
                            <p>Humidity: ${castInfo.humidity}\%</p>
                            <p>Wind: ${castInfo.wind}</p>
                        </div>
                    </div>
                <div>
            `);
                $('#5days').append(cardDisplay)

            }




        })
}



searchBtn.on('click', function (event) {
    event.preventDefault();
    var newLi = document.createElement('li');
    var inputVal = inputEl.val().trim();
    var cityName = newLi.setAttribute('value', inputVal)
    // newLi = inputVal;
    newLi.setAttribute('class', 'listStyle')
    var textCon = newLi.textContent = inputVal;
    console.log(newLi)
    var cityHistory = $('#cityHistory').append(newLi)
    cityarr.push(textCon)
    localStorage.setItem("citykey", JSON.stringify(cityarr));
    weatherApi(inputVal)
    var inputText = document.getElementById('enterCity')
    console.log(inputText.value);

});
// Select the input, grab the value from the input and then when click button.. append it to the list group
// Use localstorage to keep history persistent

var inputEl = $('#enterCity')
var searchBtn = $('#searchBtn')


function valueApp() {
    var newLi = document.createElement('li');
    var inputVal = inputEl.val();
    newLi = inputVal;
    var newBtn = document.createElement('button')
    var cityHistory = $('#cityHistory').append(newLi)

}

searchBtn.on('click', valueApp);
let appid = 'f1095d338a972e6c863ba0748a61e91f';
let units = 'metric';
let searchMethod;


//Fetching API-url from documentation --> First by city name
//Original URL = api.openweathermap.org/data/2.5/weather?q=London
//Wrting http:// my self --> Using backticks `` instead of string ''
//Need to hold on until we get the JSOn-code from the API --> .then(result)
function searchWeather(searchTerm) {                          
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appid}&units=${units}`).then(result)  

}
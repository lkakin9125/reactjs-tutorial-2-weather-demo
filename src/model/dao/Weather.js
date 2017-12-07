import $ from 'jquery';
import store from '../redux';
import LocationFactory from './Location'
var url = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid = {0} and u='c'&format=json&env=store://datatables.org/alltableswithkeys"

function getWoeid() {
    return LocationFactory.getWoeid();
}

function genYweatherUrl() {
    return url.format(getWoeid());
}

function downloadWeather(onError, onSuccess) {
    $.ajax({
        url: genYweatherUrl(),
        method: 'GET',
        success: function (result) {
            var item = result.query.results.channel.item;
            var weather = {
                condition: item.condition,
                forecast: item.forecast
            };
            console.log('download',weather);
            store.dispatch({
                type: "WEATHER_UPDATE",
                // location: LocationFactory.getLocation(),
                weather: weather
            });
            if (onSuccess) {
                onSuccess(result);
            }
        },
        error: function (xhr, status, error) {
            if (onError)
                onError(xhr, status, error);
        }
    })
}

function getState() {
    return store.getState().weather
}

function reformatWeatherObject(weather) {
    return {
        ...weather,
        image: getImageSrcViaCode(weather.code),
        displayTemp: `${weather.temp != undefined ? weather.temp : `${weather.low}-${weather.high}`} ℃`
    }
}

function getCurrWeather() {
    var rawWeather = getState().condition;
    if (rawWeather) {
        return reformatWeatherObject(rawWeather);
    } else {
        return rawWeather;
    }
}

function getForecast() {
    var forecast = [];

    var forecastRaw = getState().forecast;
    if (forecastRaw == null) {
        return forecast;
    }
    for (var i = 0; i < forecastRaw.length; i++) {
        forecast.push(reformatWeatherObject(forecastRaw[i]))
    }
    return forecast;
}

function getWeatherConditionViaCode(code) {
    switch (code) {
        case "3":
        case "4":
        case "37":
        case "38":
        case "39":
            return 'thunderstorms';

        case "45":
        case "47":
            return 'thundershowers';

        case "11":
        case "12":
        case "14":
        case "40":
        case "42":
        case "46":
        case "6":
        case "7":
        case "18":
        case "5":
        case "10":
        case "35":
        case "8":
        case "9":
            return 'rainy';

        case "26":
        case "27":
        case "28":
        case "29":
        case "30":
        case "44":
            return 'cloudy';

        default:
            return 'sunny';
    }
}

function getImageSrcViaCode(code) {
    return `/image/weather/${getWeatherConditionViaCode(code)}.svg`;
}
export default {
    downloadWeather,
    getImageSrcViaCode,
    getWeatherConditionViaCode,
    getCurrWeather,
    getForecast
}
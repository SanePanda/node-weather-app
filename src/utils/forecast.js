const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dc9867c8d42970bf5290b8a660957fc0&query=' + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect ...", undefined)
        }
        else if (body.error) {
            callback("Unable to find location ...", undefined)
        }
        else {
            weatherData = body.current
            currentTemp = weatherData.temperature
            feelsLikeTemp = weatherData.feelslike
            windSpeed = weatherData.wind_speed
            pressure = weatherData.pressure
            callback(undefined, "It is currently " + currentTemp + ". It feels like " + feelsLikeTemp  + ". The wind speed is " + windSpeed + " with an ambient pressure of " + pressure)
        }
    })
}

module.exports = forecast
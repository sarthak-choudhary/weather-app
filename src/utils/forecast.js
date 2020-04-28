const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8b3783125250c0dbdc387b9062e1e7a9/'+ encodeURIComponent(latitude)+ ',' + encodeURIComponent(longitude) + '?units=si'

    request({ url, "json": true}, (error, { body }) => {
        
        if (error) {
            callback('Unable to connect to weather services!.', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + `It is currently ${body.currently.temperature} degrees out.\nThe high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}.\nThere is a ${body.currently.precipProbability}% chance of rain`)
            
        }
    })
}

module.exports = forecast
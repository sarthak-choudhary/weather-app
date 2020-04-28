const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FydGhhay1jaG91ZGhhcnkiLCJhIjoiY2s5ZnAzNzdwMGRsdTNrcW04eHF6am4zdSJ9.YLeWg13LrgDIL9tf0TsD-g&limit=1'

    request ({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0 ) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                'latitude': body.features[0].center[1],
                'longitude': body.features[0].center[0],
                'location': body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
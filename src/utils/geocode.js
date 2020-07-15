const request = require('request')
const geocode = (address , callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoidmltYWxnYWxhbmkyOCIsImEiOiJja2NpdzBnMG8xZm13MnJtMjVtbWd1amJ3In0.Xg3Rv13j7yJQYLnZJsQuGA&limit=1"
    request({ url , json : true} , (error , { body }={}) => {
        if(error){
            callback("Unable to connect to location. Please check your network connection")
        }else if(body.features.length === 0) {
            callback("Unable to find location. Please try different search.")
        }else {
            callback(undefined , {
                location : body.features[0].place_name ,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            })
        }
    })
}
module.exports = geocode;
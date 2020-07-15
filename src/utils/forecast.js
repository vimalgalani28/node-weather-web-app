const request = require("request");

const forecast = (latitude , longitude, callback) => {
    url = "https://api.darksky.net/forecast/5575c8ba7426b8ee259fbefac0417b8a/"+ encodeURIComponent(latitude) +"," + encodeURIComponent(longitude) + "?units=si";
    request({ url , json : true} , (error , { body }={}) => {
        if(error){
            callback("Unable to connect to weather api. Please check your network connection")
        }else if (body.error){
            callback("Unable to find location. Please try some different search")
        }else {
            const data = body.daily.data[0].summary + " There is temperature of " + body.currently.temperature + " degrees outside. " + "There is " + body.currently.precipProbability + "% chances of raining."
            callback(undefined , data)
        }
    })
}
module.exports = forecast
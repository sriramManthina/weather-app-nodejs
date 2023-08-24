const request = require('postman-request')



// api.weatherstack.com/current?
// access_key=12bc16d7839bad55610260029d9b42b7
// query=37.8267,-122.4233
// units=f (f for fahrenheit, m for celsius)



let url = 'http://api.weatherstack.com/current?access_key=12bc16d7839bad55610260029d9b42b7&query=37.8267,-122.4233&units=f'



const weatherStack_baseURL = 'http://api.weatherstack.com/current'
const weatherstack_accessKey = '12bc16d7839bad55610260029d9b42b7'

const generateWeatherStackURL = (lat, lon, unit) => {
    return `${weatherStack_baseURL}?access_key=${weatherstack_accessKey}&query=${lat},${lon}&units=${unit}`
}


const getWeatherDetails = (latitude, longitude, callback) => {

    url = generateWeatherStackURL(latitude, longitude, 'm')

    // using property shorthand for url (refer 5-es6-objects file)
    request({url, json : true}, (err, {body}) => {
        if(err){
            callback(`unable to connect to weather services`, undefined)
        } else if (body.error) {
            callback('unable to fetch requested location', undefined)
        }   else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees celsius, It feels like ${body.current.feelslike} degrees celsius.`)
        }
    })    
}


module.exports = {
    getWeatherDetails : getWeatherDetails
}
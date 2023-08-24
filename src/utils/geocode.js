const request = require('postman-request')

let url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic3JpcmFtdmFybWEiLCJhIjoiY2xrNm1rMHZrMDBobDNzcm83MjlyOW1paSJ9.TJBLt_bD6alOFxZ3L0HhOA&limit=1'

// mapbox access_key
// pk.eyJ1Ijoic3JpcmFtdmFybWEiLCJhIjoiY2xrNm1rMHZrMDBobDNzcm83MjlyOW1paSJ9.TJBLt_bD6alOFxZ3L0HhOA


const mapBox_baseURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const mapBox_accessToken = 'pk.eyJ1Ijoic3JpcmFtdmFybWEiLCJhIjoiY2xrNm1rMHZrMDBobDNzcm83MjlyOW1paSJ9.TJBLt_bD6alOFxZ3L0HhOA'

const generateMapBoxURL = (place) => {
    return `${mapBox_baseURL}${encodeURIComponent(place)}.json?access_token=${mapBox_accessToken}&limit=1`
}


const getGeocode = (place, callback) => {
    url = generateMapBoxURL(place)

    // using property shorthand for url (refer 5-es6-objects file)
    request({url, json : true}, (error, {body}) => {
        if(error){
            console.log('error: ' + error)
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length === 0){
            console.log(`couldn't find geocoding for the requested place`)
            callback('Unable to find the location', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const place = body.features[0].place_name
            const resObj = {
                latitude,
                longitude,
                place
            }
            callback(undefined, resObj)
        }
    })
}



module.exports = {
    getGeocode : getGeocode
}
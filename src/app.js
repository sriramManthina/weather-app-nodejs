// node core  modules
const path = require('path')


// npm packages
const express = require('express')
const hbs = require('hbs')


// local utils packages
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()


// directories for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')


// set handlebars engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sriram'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'We are here to help You',
        name: 'Sriram'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sriram'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an Address to fetch weather'
        })
    }


    geocode.getGeocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error){
            console.log(error)
            return res.send({
                error
            })
        }

        forecast.getWeatherDetails(latitude, longitude, (err, forecastRes) => {
            if(err){
                console.log(err)
                return forecastRes.send({
                    error
                })
            } 

            console.log(`The weather at ${place} is ${forecastRes}`)
            return res.send({
                address: req.query.address,
                message: `The weather at ${place} is ${forecastRes}`,
                location: place,
                coordinates: [latitude, longitude]
            })
        })  
    })
})


// app.get('*', (req, res) => {
//     res.redirect('/')
// })


app.get('help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sriram',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sriram',
        errorMessage: 'Page Not Found'
    })
})




app.listen(3000, () => {
    console.log('Server Up')
})
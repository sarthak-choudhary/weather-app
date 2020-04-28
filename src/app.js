const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('/help', (req, res) => {
    res.render('help', {
        "message": "For Help Stay tuned. ",
        "title": "Help",
        "name": "Sarthak Choudhary"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        "title": "About me",
        "name": "sarthak choudhary"
    })
})

app.get('', (req, res) =>{
    res.render('index', {
        "title": 'Weather',
        "name": "sarthak choudhary"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            "error": "you must provide an address. "
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) =>{
        if (error) {
            return res.send({ error })
        }

        forecast (latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                "forecast": forecastData,
                location,
                address: req.query.address
            })
        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        "title": "Error",
        "error": "Help Article not Found .",
        "name": "Sarthak Choudhary"
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        "title": "Error",
        "name": "Sarthak Choudhary",
        "error": "Page Not Found ."
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
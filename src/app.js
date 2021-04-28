const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(partialsPath)

const app = express()

const port=process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('home', {
        title: 'Hello'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Gourav', title: 'abouttt'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'helpasd',
        name: 'Gourav'
    })
})



app.get('/about', (req, res) => {
    res.send('<h1>About Pagee</h1>')
})
////////////////////////////////////////////////
app.get('/weather', (req, res) =>  {
    const address = req.query.address
    if (!address) {
        return res.send("Location not provided in Url!")
    }

    geocode.geocode(address, (error, { latitude, longitude, place_name } = {}) => {
        if (error) {
            return res.send({ error})
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: place_name
            })
            // res.send('In')
            // res.send(location)
        })


    })


})
////////////////////////////////
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'No Search term found'
        })
    }

    console.log(req.query)
    res.send({ name: [] })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 'Help article not Found'
    })
})

app.get('/*', (req, res) => {
    res.render('error', {
        error: 'Page not Found'
    })
})
app.listen(port, () => {
    console.log("Server is Working on port"+ port)
})
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const staticDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

app.use(express.static(staticDir))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Avishek'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'Weather app',
        name: 'Avishek'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title:'Weather app',
        name: 'Avishek',
        message: "This is some helpful text"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "No address provided"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                location,
                forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Avishek',
        error_message: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title: '404',
        name: 'Avishek',
        error_message: "Error 404. Page not found"
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
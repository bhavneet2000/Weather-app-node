const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const pathDirectoryPublic = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../partials');

app.use(express.static(pathDirectoryPublic));
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        Name: 'Square pants'
    });
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About',
        Name: 'Sponge Bob'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        Message: 'Help!',
        Name: 'Noddy',
        title: 'Help'
    });
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You must enter an address."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error)   return res.send({error});
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error)   return res.send({error});
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

    
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        Message: 'Help article Not found',
        Name: 'Patty'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
       title: '404',
       Name: 'SANTA',
       Message: '404 ERROR!!' 
    });
})

app.listen(3000, ()=>{
    console.log("SERVER UP");
})
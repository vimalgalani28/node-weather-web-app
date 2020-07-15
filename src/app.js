const path = require('path')
const express = require('express')
const hbs =require('hbs')
const app = express()
const port = process.env.PORT || 3000
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const publicPath = path.join(__dirname , "../public")
const viewsPath = path.join(__dirname ,  "../templates/views")
const partialsPath = path.join(__dirname , "../templates/partials")
app.use(express.static(publicPath))
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)
app.get('' , (req , res) => {
    res.render('index' , {
        title : "Weather" ,
        name : "Vimal Galani"
    })
})
app.get('/about' , (req , res) => {
    res.render('about' , {
        title : "About" ,
        name : "Vimal Galani"
    })
})
app.get('/help' , (req , res) => {
    res.render('help' , {
        title : "Help" ,
        name : "Vimal Galani"
    })
})
app.get('/weather' , (req , res) => {
    if(!req.query.search){
        return res.send({
            error : 'Please add a search'
        })
    }
    geocode( req.query.search, (error , { latitude , longitude ,location }={}) =>{
        if(error){
            res.send({error})
        }else {
            forecast(latitude.toString() , longitude.toString() , (error , forecastdata) =>{
                if (error) {
                    res.send({error})
                }else{
                    res.send({
                        location ,
                        forecast : forecastdata
                    })
                }
            })
        }
    })
})
app.get('*',(req , res) =>{
    res.render('404' , {
        title : '404' ,
        name : "Vimal Galani",
        error : 'Not found'
    })
})
app.get('/help/*',(req , res) =>{
    res.render('404' , {
        title : '404' ,
        name : "Vimal Galani",
        error : 'Help Not found'
    })
})

app.listen(port , () =>{
    console.log("Server port " + port)
})
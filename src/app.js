const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()


const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))



app.get('',(req, res) => {

  
  res.render('index', {
      title: 'Weather',
      name: "nishant"




  })

})

app.get('/products',(req,res) => {

    if(!req.query.search){

        return res.send({
            error: 'You must provide a search term'
        })
       
    }
    console.log(req.query)
    res.send({
        products: []
    })





})





app.get('/help',(req,res) => {

res.render('help',{
    helpText: 'this is some helpful text.',
    title: 'help',
    name: 'Andrew Head'

})

})

app.get('/about',(req, res) => {

    res.render('about',{
        title: 'About me',
        name: 'nishant'
    })
    
    })
    
app.get('/weather',(req,res) => {
    if(!req.query.address){
        
        return res.send({
             error: 'You have not given the correct address'
         })
     }

     geocode(req.query.address,(error,{ longitude, latitude, location} = {} ) => {
        if(error){
        
            return res.send({
                 error: 'You have not given the correct address 2'
             })
         }
         forecast(longitude,latitude, (error,forecastData) => {
             console.log(forecastData)
            if(!error){
        
                return res.send({
                     error: 'You have not given the correct address 3'
                 })
             }

             res.send({
                       forecast: forecastData,
                       location,
                       address: req.query.address
            
             })



         })

     })


     
    // res.send({
    //   forecast: 'Its Amazing!',
    //   location: 'Philadelphia',
    //   address: req.query.address

    // })

    })




    app.get('/help/*',(req,res) =>{

       res.render('deck',{
           title: '404',
           message: 'Page not found',
           name: 'Nishant'


       })

    })

    app.get('*',(req,res) => {
        res.render('deck',{
            title: '404',
            message: 'error 404',
            name: 'Nishant'
 
 
        })
    })
 

app.listen(3000, () => {



})
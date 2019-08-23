const request = require('request')

const forecast = (longitude, latitude,callback) => {
    console.log(latitude)
    const url = 'https://api.darksky.net/forecast/6ebe2e0b6ccb5c8cdac719b20e67fdf1/'+ latitude +','+ longitude + '?lang=es&un=en'
     
     request({url,json: true},(error, { body}) => {
         if(error){

            callback('Unable to connect ',undefined)
         } else if(body.error){

            callback('unable to find the location',undefined)
         } else{
               //   console.log(body.daily.data[0])
            callback('undefined', body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is' + body.daily.data[0].temperatureHigh + 'with a low of' + body.daily.data[0].temperatureLow  + ' .There is a ' + body.currently.precipProbability + '% chance of rain.')
         }
       
    
     })


}

module.exports = forecast
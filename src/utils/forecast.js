const chalk = require('chalk')
const request=require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=188c0737ada02b2fa11667981abb7452&query=' +latitude + ',' + longitude + '&units=m'
    request({ url, json: true }, (error, {body}) => {

      // const {
        success=body.success,
        temperature=body.current.temperature,
        feelslike=body.current.feelslike
      // } = response

         

      if (error) {
          
        callback('Something went wrong! Check your connectivity')
      }
      else if (success === false) {
        callback(error)
      }
      else {
        // temperature = response.body.current.temperature
        // feelslike = response.body.current.feelslike
        callback(undefined, "It is currently " + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.')
      }
    })
  }

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=188c0737ada02b2fa11667981abb7452&query=' +latitude + ',' + longitude + '&units=m'
//     request({ url: url, json: true }, (error, response) => {
//       const {success=response.body.success,
//         info=response.body.error.info,
//         temperature=response.body.current.temperature,
//         feelslike=response.body.current.feelslike,
      
//       }=response
//       if (error) {
          
//         callback('Something went wrong! Check your connectivity')
//       }
//       else if (response.body.success === false) {
//         callback(response.body.error.info)
//       }
//       else {
//         // temperature = response.body.current.temperature
//         // feelslike = response.body.current.feelslike
//         callback(undefined, "It is currently " + temperature + ' degrees out. It feels like ' + feelslike + ' degrees out.')
//       }
//     })
//   }

  module.exports={
      forecast:forecast
  }
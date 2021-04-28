const request=require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFudW1hbnRlIiwiYSI6ImNrbmVwejZ2azAzYTIyb280czRmNWs2NXMifQ.ZZlU_Ahyn8KRMJuq4NYprw'
    request({ url, json: true }, (error, {body}) => {

        

        if (error) {
            
            callback("Something went wrong!,Check your internet connectivity")
        }
        else if (body.features.length === 0) {
            callback("Unknown Location, Please check again!")
        } else {
            latitude = body.features[0].center[1]
            longitude =body.features[0].center[0]
            place_name =body.features[0].place_name

            callback(undefined, {
                latitude, longitude, place_name
            })


        }
    })

}

module.exports={
    geocode:geocode
}
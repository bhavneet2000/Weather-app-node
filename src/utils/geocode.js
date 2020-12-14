const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmhhdm5lZXQyMDAwIiwiYSI6ImNraTd0MnhpYzE3ZHAydm1oc3AwZHI2MHgifQ.HY1GcWnlqeeZqgHpqQEw1w&limit=1';
    request({url: url, json:true}, (error, response) =>{
        if(error)   callback('Unable to Connect!', undefined);
        else if(response.body.features.length===0) callback('Location Not found!', undefined);
        else{
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;
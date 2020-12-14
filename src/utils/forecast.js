const request = require('request');

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.openweathermap.org/data/2.5/find?lat=' + encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) +  '&appid=d8c6ba09307999532eb6f80d61d15864&units=metric'
    request({url : url, json:true}, (error, response)=>{
        if(error) callback('No Internet!', undefined);
        else if(response.body.error)    callback('Unable to find location!', undefined);
        else{
            callback(undefined, 
                "It is going to be " +  response.body.list[0].weather[0].description + 
                " and the temperature will be " +  response.body.list[0].main.temp + " degree Celsius"
            );
        }
    })

}

module.exports = forecast;
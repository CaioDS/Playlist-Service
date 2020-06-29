const axios = require('axios');

class WeatherData {
    constructor({ response }){
        this.response = response.city || response.coordinate;
        this.temperature = WeatherData.controllerResponse({ data: this.response });
    }

    static async controllerResponse({ data }){
        let temperature;
        if(!data.X){
            temperature = await WeatherData.cityName(data);
        } else {
            temperature = await WeatherData.geographicCoordinate({ coordinate: data });
        }

        return temperature;
    }

    static async cityName(city){
        let temp;
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a4c5685322e8b96b6d0bbbc3c65b3e80`)
            .then(function(response){
                temp = response.data.main.temp;
            });
        temp = WeatherData.celsiusConvert(temp);
        return temp;
    }

    static async geographicCoordinate({ coordinate }){
        let temp;
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${coordinate.X}&lon=${coordinate.Y}&appid=a4c5685322e8b96b6d0bbbc3c65b3e80`)
            .then(function(response){
                temp = response.data.main.temp; 
            });
        temp = WeatherData.celsiusConvert(temp);
        return temp;
    }

    static celsiusConvert(temperatura){
        return (temperatura - 273.15);
    }

}

module.exports = WeatherData;
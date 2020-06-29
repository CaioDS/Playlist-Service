const SpotifyData = require('../Data/SpotifyData');
const WeatherData = require('../Data/WeatherData');

class Playlist {
    constructor({ response }){
        this.weatherData = new WeatherData({ response });
        this.spotifyData = new SpotifyData();
    }

    async controllerResponse({ response }){
        let temperature = await this.weatherData.temperature;
        let genre = Playlist.genreDefine(temperature);
        let playlistArray = await this.spotifyData.selectCategory(genre);

        return playlistArray;
    }

    static genreDefine(temperature){
        let genre;

        if(temperature > 30){
            genre = 'party';
        } else if(temperature >= 15 && temperature <= 30){
            genre = 'pop';
        } else if(temperature >= 10 && temperature <= 14){
            genre = 'rock';
        } else {
            genre = 'classic';
        }
        console.log(genre);
        return genre;
    }

};

module.exports = Playlist;
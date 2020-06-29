const SpotifyApi = require('spotify-web-api-node');
const { CLIENT_ID, SECRET_ID } = require('../config');

class SpotifyData {

    static authorization(){
        return new SpotifyApi({
            clientId: CLIENT_ID,
            clientSecret: SECRET_ID
        });
    }

    async selectCategory(genre){
        let playlist;

        const accessToken = SpotifyData.authorization();

        await accessToken.clientCredentialsGrant().then(async function(data) {
      
            accessToken.setAccessToken(data.body['access_token']); 
            await accessToken.searchTracks(`genre:${genre}`, {

                Authorization: data.body['access_token'],

            }).then(function(dado) {
                playlist = dado.body.tracks.items;

            }, function(err) {
                console.log("Something went wrong!", err);

            });

          },
          function(err) {
              console.log(
                  'Something went wrong when retrieving an access token',
                  err.message
              );
          }
        );
        //console.log(playlist);
        return playlist;
    }

}

module.exports = SpotifyData;
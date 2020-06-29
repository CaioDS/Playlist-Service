const express = require('express');
const Playlist = require('./Service');
const bodyParser = require('body-parser');

const PORT = 4000;
const HOST = "0.0.0.0";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));

// GET[ /playlist/ ]
app.get("/playlist/", async (req, res) => {
  let response, playlist, array;

  response = {
    city: req.query.city,
    coordinate: {
      X: req.query.X,
      Y: req.query.Y
    }
  };

  playlist = new Playlist({ response });
  
  array = await playlist.controllerResponse({ response });
  res.send(array);

});

app.listen(PORT, HOST);
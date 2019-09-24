require("dotenv").config();
var keys = require("./keys.js");
console.log(keys);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require('axios');
var moment = require('moment');
// moment().format()

var songTitle = 
var 
function spotifyThis(songtitle){
    spotify.search({ type: 'track', query: songtitle }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }


   
  console.log(data.tracks.items); 
  });
}
//   5 functions running

// function for router 
//   if user input == spotify, then run spotify function
//  if user input == omdb, run omdb
//  process.argv === userinput
//  

//spotify function
//movie this function
//concert this function
//do what it says function
//   string manipulate 

//


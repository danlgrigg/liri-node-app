//set requirements
require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
// moment().format()

//create variables fo
var command = process.argv[2];
var userinput = process.argv.slice(3).join(" ");

liri(command, userinput);

//main liri function will accept user input and direct through if statements which api call runs
function liri(command, userinput) {
  //this function will retrieve concert data points for music artist typed in
  if (command === "concert-this") {
    var URL =
      "https://rest.bandsintown.com/artists/" +
      userinput +
      "/events?app_id=codingbootcamp";
    console.log(URL);
    axios
      .get(URL)
      .then(function(response) {
        console.log(response.data);
        // axios moment
      })
      //catch error function and log to the console
      .catch(function(err) {
        if (err) {
          console.log(err);
        }
      });
  }
  //this function will retrieve omdb data points when movie is typed in, or if blank search default
  else if (command === "movie-this") {
    if (userinput === "") {
      userinput = "Mr. Nobody";
    }

    axios
      .get(
        "htttp://www.omdbapi.com/?t=" +
          userinput +
          "&y=&plot=short&apikey=trilogy"
      )
      .then(function(response) {
        //retrieve each data point and log to console
        console.log(response.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
  //this function will pull the data points when a song is typed
  else if (command === "spotify-this-song") {
    //search function creates array of response items
    spotify.search({ type: "track", query: userinput }, function(err, data) {
      //console log error
      if (err) {
        return console.log("Error occurred: " + err);
      }

      // console.log(data);
      //loop through the response items and console log data points
      for (let i = 0; i < data.tracks.items.length; i++) {
        console.log(data.tracks.items[i].album.artists[0].name);
        console.log(data.tracks.items[i].album.name);
        console.log(
          data.tracks.items[i].album.artists[0].external_urls.spotify
        );
        console.log(data.tracks.items[i].album.name); //research song title
      }
    });
  }
  //this function will pull the data from the random.txt file, and console log any error
  else if (command === "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      }
      //pulls the data from txt and creates array to then run inside main liri function
      var array = data.split(",");
      //    console.log(array);
      liri(array[0], array[1]);
    });
  }
}
//   5 functions running

//1. function for router
//  if user input == spotify, then run spotify function
//  if user input == omdb, run omdb
//  process.argv === userinput`
//

//2. spotify function
//3. movie this function
//4. concert this function
//5. do what it says function
//   string manipulate

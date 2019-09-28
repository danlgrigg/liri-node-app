//set requirements
require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

//create variables to store user input
var command = process.argv[2];
var userinput = process.argv.slice(3).join(" ");

liri(command, userinput);
//Main function will act as router to accept user input and direct through if statements which api call runs
function liri(command, userinput) {
  //This function will retrieve concert data points for music artist typed in
  if (command === "concert-this") {
    var URL =
      "https://rest.bandsintown.com/artists/" +
      userinput +
      "/events?app_id=codingbootcamp";

    axios
      .get(URL)
      .then(function(response) {
        console.log("Venue: " + response.data[1].venue.name);
        console.log("City: " + response.data[1].venue.city);
        console.log(
          "Date: " + moment(response.data[1].datetime).format("MM/DD/YYYY")
        );
        console.log("-------------------------------------------------");
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
      //retrieve each data point and log to console
      .then(function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log(
          "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value
        );
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      })
      //catch and log any error to console
      .catch(function(err) {
        console.log(err);
      });
  }
  //this function will pull the data points when a song is typed
  else if (command === "spotify-this-song") {
    if (userinput === "") {
      userinput = "The Sign";
    }
    //search function creates array of response items
    spotify.search({ type: "track", query: userinput }, function(err, data) {
      //console log error
      if (err) {
        return console.log("Error occurred: " + err);
      }

      //loop through the response items and console log data points for each
      for (let i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items;
 
        console.log("Artist: " + songData[i].artists[0].name);
        console.log("Song: " + songData[i].name);
        console.log("Preview Link: " + songData[i].preview_url);
        console.log("Album: " + songData[i].album.name);
        console.log("-------------------------------------------------");
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
     
      liri(array[0], array[1]);
    });
  }
}

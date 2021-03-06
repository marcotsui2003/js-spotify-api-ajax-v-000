var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getSpotifyTracks(success);
});

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.slice(0,10)
}

function extractPopularity(tracks) {
  return $.map(tracks, function(track, index) {
    return track.popularity;
  });
}

function extractNames(tracks) {
  return $.map(tracks, function(track, index) {
    return track.name;
  });
}

function chartData(labels, inputData) {
  var data = {};
  data['labels'] = labels;
  data['datasets'] =[];
  data['datasets'][0] = {};
  data['datasets'][0]['fillColor'] = dataSetProperties['fillColor'];
  data['datasets'][0]['strokeColor'] = dataSetProperties['strokeColor'];
  data['datasets'][0]['highlightFill'] = dataSetProperties['highlightFill'];
  data['datasets'][0]['highlightStroke'] = dataSetProperties['highlightStroke'];
  data['datasets'][0]['data']  = inputData;

  return data;
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
  $.ajax({
    url: url,
    //type: 'GET',
    //contentType: 'application/json',
    dataType: 'json',
    success: success

  });
}


function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
  var tracks = parsedJSON.tracks;
  var labels = extractNames(tracks);
  var inputData = extractPopularity(tracks);
  var data = chartData(labels, inputData);
  debugger;


  // Get context with jQuery - using jQuery's .get() method.
  // this did not work - var ctx = document.getElementById("#spotify-chart").getContext("2d");
  var ctx = $('#spotify-chart').get(0).getContext('2d')
  // This will get the first returned node in the jQuery collection.
  //create a new Chart object
  new Chart(ctx).Bar(data);
}

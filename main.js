// 1. First select and store the elements you'll be working with
// 2. Create your `onSubmit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

function clearBox(htmlSelector)
{
    document.querySelector(htmlSelector).innerHTML = '';
}


function searchFunction(searchCriteria){
  fetch(`https://api.soundcloud.com/tracks?client_id=${apikey}&q=${searchCriteria}`)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log(json);

      clearBox('.results');

      var streamUrl = [];
      var playTrack = [];

      for(var i = 0; i < json.length; ++i){
        console.log(json[i]);

        // TODO: set url to the src of 'music-player' in order to get the audio player to work
        // might need to change permalink_url to stream_url

        var artistName = json[i].user.username;
        console.log('Artist Name: ' + artistName);

        var trackTitle = json[i].title;
        console.log('Track Title: ' + trackTitle);

        var artistPageUrl = json[i].permalink_url;
        console.log('Artist Page URL: ' + artistPageUrl);

        var artistPictureUrl = json[i].artwork_url;
        console.log('Artist ProfilePic URL: ' + artistPictureUrl);

        var artistID = json[i].id;
        console.log('ArtistID: ' + artistID);

        var streamUrl = json[i].stream_url + '?client_id=' + apikey;
        console.log(streamUrl)

        var htmlClear = '';

        var htmlResults = `
          <div class="result-artist" id="${streamUrl}">
            <div class="result-artist-picture" >
              <img src="${artistPictureUrl}" alt="${artistName}">
            </div>
            <div class="result-track-title">
              Song Title: ${trackTitle}
            </div>
            <div class="result-artist-name">
              Artist: ${artistName}
            </div>
          </div>
        `

        injectHTML(htmlResults);

        function injectHTML(html){
          document.querySelector(".results").insertAdjacentHTML('afterbegin', html);
        }
      }
      var staticHtml = `
        <div class="results-heading">
          <h2>Search Results:</h2>
        </div>
      `
      // injects "Search Results:" after a search is run
      function injectStaticHtml(staticHtml){
        document.querySelector(".results").insertAdjacentHTML('afterbegin', staticHtml);
      }
      injectStaticHtml(staticHtml);

      var artistDiv = document.querySelectorAll('.result-artist')
      for (var p = 0; p < artistDiv.length; p++) {
        let artistUrl = artistDiv[p].id
        artistDiv[p].addEventListener('click', function(event){
          console.log(artistUrl);
          clearBox('.music-player');
          var audioClassSRC = document.querySelector('.music-player');
          audioClassSRC.src = artistUrl;
        })
      }
    })
}

var searchString = document.querySelector('.search-form').addEventListener('submit', function(event){
  event.preventDefault();
  var searchString = document.querySelector('#searchBox').value;
  console.log(searchString);
  searchFunction(searchString);
});

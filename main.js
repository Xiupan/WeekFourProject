// TODO: Styling with CSS

function clearBox(htmlSelector) // function that clears an area of HTML
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

      var artistDiv = document.querySelectorAll('.result-artist') // plays the song clicked on
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

var searchString = document.querySelector('.search-form').addEventListener('submit', function(event){ // runs the search function after 'submit'
  event.preventDefault();
  var searchString = document.querySelector('#searchBox').value;
  console.log(searchString);
  searchFunction(searchString);
});

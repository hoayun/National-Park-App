
var stateList = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
    "DC"

];
// creates the state selection dropdown menue
 function renderButtons () {

 for(var i = 0; i < stateList.length; i++){
 
   var stateSel = $("<option>").attr("state-name", stateList[i]).addClass("stateOption dropdown-item").attr("value", stateList[i]).text(stateList[i]);
          $(".form-control").append(stateSel);
          $(".dropdown-menu").append(stateSel);
}
}
renderButtons();

// pouplates the list of state parks from the state selection
$(document.body).on("click",".stateOption", function() {

    $(".park").empty();
    $("#pic").empty();

  var stateCode = $(this).attr("state-name");

    $("#selectedstate").text("|     " + stateCode + "     |");

  var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateCode + "&limit=1000&api_key=aN556zOtA9aa0cD6vuxveBONKziR8YgtFOaOiZls"

  $.ajax({
      url: queryURL,
      method: "GET"

  })
  
  .then(function(response) {
    
      var results = response.data


        for(i = 0; i < results.length; i++) {
          console.log("Success!");
          console.log(results);
          console.log(results[i].states);
          console.log(stateCode);

        if(stateCode === results[i].states) {

    // creates the card body 
          var parkDiv = $("<div>")
          var cardDiv = $("<div>").addClass("card");
          var cardInfo = $("<div>").addClass("card-content");
          var parkName = $("<span class = 'card-title activator grey-text text-darken-4'>" + results[i].fullName + "<i class='material-icons right'>more_vert</i></span>");
          var parkLink = $("<p><a href=" + results[i].url + "> Park Webpage | " + results[i].url + "</a></p>");
          


    // creates reveal modal
          var cardReveal = $("<div>").addClass("card-reveal")
          var rparkName = $("<span class = 'card-title grey-text text-darken-4'>" + results[i].fullName + "<i class='material-icons right'>close</i></span>")
          var parkDescription = $("<p>").addClass("parkDescription").text("Description: " + results[i].description)
          var parkDirections = $("<p>").addClass("parkAddress").text("Directions: " + results[i].directionsInfo);
          var parkWeather =  $("<div>").addClass("parkWeather").text( results[i].weatherInfo)
          var weatherDiv = $("<div>").attr("id", "weatherDiv");

            parkDiv.append(cardDiv);
            cardInfo.append(parkName);
            cardReveal.append(parkLink)
            cardDiv.append(cardInfo);
            cardReveal.append(rparkName);
            cardInfo.append(parkDescription);
            cardReveal.append(parkDirections)
            cardReveal.append(parkWeather)
            cardDiv.append(cardReveal);
            $(".park").append(parkDiv);
            
    // Ajax Request to google places API
          var parkname = results[i].fullName.trim()
              parkname = parkname.replace(/\s+/g, '');

    var queryURL3 = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + parkname + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD2LUBEEH2AkOsk_jhIPt1UYqUTUq5QBRA";
      
  $.ajax({
    url: queryURL3,
    method: "GET"
  }).then(function(responseImage) {
    
          var picture = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + responseImage.candidates[0].photos[0].photo_reference +"&key=AIzaSyD2LUBEEH2AkOsk_jhIPt1UYqUTUq5QBRA";
          var parkImage = $("<img>").addClass("rounded-circle border border-warning activator").attr("src", picture);

            $("#pic").append(parkImage);
        });

        // AJax request to weatherbit API 
                // retriveing the park grid coordinates using the google places API
          var location = results[i].latLong;
          var reLocation = /[^\d.-]/
          var arrLocation = location.split(reLocation)
          var lat = arrLocation[4]
          var lon = arrLocation[11]

    var queryURL4 = "https://api.weatherbit.io/v2.0/current?lang=en&units=I&lat=" + lat + "&lon=" + lon + "&key=3cb3d66eef7148fd87971e18a247932e"

  $.ajax({
      url: queryURL4,
      method: "GET"
  }).then(function(responseWeather) {
      
                console.log("weather results" + responseWeather.data);
                console.log(responseWeather.data[0].precip)
                console.log(responseWeather.data[0].temp)
                console.log(responseWeather.data[0].sunrise)
                console.log(responseWeather.data[0].sunset)
                var weatherTemp = $("<p>").text("Current Temp: " + responseWeather.data[0].temp);
                var weatherPrecip = $("<p>").text("Precipitation: " + responseWeather.data[0].precip);
                var weatherRise = $("<p>").text("Sunrise: " + responseWeather.data[0].sunrise);
                var weatherSet = $("<p>").text("Sunset: " + responseWeather.data[0].sunset);

                var weatherdiv = $("<div>")
                var wcardDiv = $("<div>").addClass("card");
                var wInfo = $("<div>").addClass("card-content");
                
                weatherdiv.append(wcardDiv);
                wInfo.append(weatherTemp);
                wInfo.append(weatherRise);
                wInfo.append(weatherSet);
                wInfo.append(weatherPrecip);
                wcardDiv.append(wInfo);
               
                
               
               
                $(".weather").append(weatherdiv);
               
               
      });
    }
  }
});
});
   
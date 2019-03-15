
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
 
 function renderButtons () {
 
 for(var i = 0; i < stateList.length; i++){
 
   var stateSel = $("<option>");
 //    stateSel.addClass("button")

   stateSel.attr("state-name", stateList[i]);
   stateSel.addClass("stateOption dropdown-item")
   stateSel.attr("value", stateList[i]);
   stateSel.text(stateList[i]);
   $(".form-control").append(stateSel);
   $(".dropdown-menu").append(stateSel);
}

}
renderButtons();

$(document.body).on("click",".stateOption", function() {

$(".park").empty();

var stateCode = $(this).attr("state-name");

var queryURL = "https://developer.nps.gov/api/v1/parks?stateCode=" + stateCode + "parkCode=acad&api_key=aN556zOtA9aa0cD6vuxveBONKziR8YgtFOaOiZls"

$.ajax({
    url: queryURL,
    method: "GET"
})
 
 .then(function(response) {
 
    var results = response.data

    for(i = 0; i < results.length; i++) {
    console.log("Success!");
    console.log(response);
    console.log(results);
    console.log(queryURL);
    console.log(results[i].states);
    console.log(stateCode);

    if(stateCode === results[i].states) {

        // creates the card body
    var parkDiv = $("<div>").addClass("col-sm-4");
    var cardDiv = $("<div>").addClass("card");
    var cardImg = $("<div>").addClass("card-image waves-effect waves-block waves-light");
    var parkImage = $("<img>").addClass("activator").attr("src", "https://cbsnews1.cbsistatic.com/hub/i/2018/10/25/89f3a96b-2dcf-4055-a9a9-bdec0ad6e5d0/yosemite.jpg");
    var cardInfo = $("<div>").addClass("card-content");
    var parkName = $("<span class = 'card-title activator grey-text text-darken-4'>" + results[i].fullName + "<i class='material-icons right'>more_vert</i></span>");
    var parkLink = $("<p><a href=" + results[i].url + "> 'LINK' </a></p>");
    
    // creates reveal modal
    var cardReveal = $("<div>").addClass("card-reveal")
    var rparkName = $("<span class = 'card-title grey-text text-darken-4'>" + results[i].fullName + "<i class='material-icons right'>close</i></span>")
    var parkDescription = $("<p>").addClass("parkDescription").text("Description: " + results[i].description)
    var parkDirections = $("<p>").addClass("parkAddress").text("Directions: " + results[i].directionsInfo);
    // var parkfullName =  $("<p>").addClass("parkname").text(results[i].fullName);
    // var parkState =  $("<p>").addClass("parkState").text(results[i].states);
    // var parkWeather =  $("<p>").addClass("parkWeather").text(results[i].weatherInfo);
    // creates the reveal tab


    parkDiv.append(cardDiv);
    cardDiv.append(cardImg);
    cardImg.append(parkImage);
    cardInfo.append(parkName);
    cardInfo.append(parkLink)
    cardDiv.append(cardInfo);
    cardReveal.append(rparkName);
    cardReveal.append(parkDescription);
    cardReveal.append(parkDirections)
    cardDiv.append(cardReveal);
    
    // parkDiv.append(parkfullName);
    // parkDiv.append(parkState);
    // parkDiv.append(parkWeather);
    $(".park").append(parkDiv);
    }
    else {
     console.log(results[i].states);
    }


    var location = results[i].latLong;
    var reLocation = /[^\d.-]/
    var arrLocation = location.split(reLocation)

    var lat = arrLocation[4]
    var lon = arrLocation[11]

    console.log(arrLocation);
    console.log(lat);
    console.log(lon);

    }
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat +"&lon=" +lon +"&appid=e9a10084a1f3dbf9d885547ab6255b32"
  
  
  
    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // })

    //  .then(function(response){
    //     console.log(queryURL);
    //     console.log(response);
    //   })
  

// })
// });

 
//  }
 })
 });


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
    var parkWeather =  $("<div>").addClass("parkWeather").text("Weather forecast: *****")
    // creates the reveal tab


    parkDiv.append(cardDiv);
    cardDiv.append(cardImg);
// CARDIMAGE
    cardInfo.append(parkName);
    cardInfo.append(parkLink)
    cardDiv.append(cardInfo);
    cardReveal.append(rparkName);
    cardReveal.append(parkDescription);
    cardReveal.append(parkDirections)
    cardReveal.append(parkWeather)
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

// below is the ajax for card images from google places
    var parkname = results[i].fullName.trim()

   parkname = parkname.replace(/\s+/g, '');
   console.log(parkname);

   var queryURL3 = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + parkname + "&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD2LUBEEH2AkOsk_jhIPt1UYqUTUq5QBRA";
   
   $.ajax({
     url: queryURL3,
     method: "GET"
   }).then(function(responseImage) {

     console.log("This is the response: ", responseImage);
    // POssible responses: response.candidates[0].formatted_address, response.candidates[0].photos, response.candidates[0].geometry


    var picture = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + responseImage.candidates[0].photos[0].photo_reference +"&key=AIzaSyD2LUBEEH2AkOsk_jhIPt1UYqUTUq5QBRA";
    var parkImage = $("<img>").addClass("activator").attr("src", picture);
    cardImg.append(parkImage);

//    };

    // close forloop
    });
    };
 })
});
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
//  })
//  });
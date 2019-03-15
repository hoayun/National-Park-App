
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

$(".parkDiv").empty();

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
    var parkDiv = $("<div>").addClass("parkDiv")
    var parkDescription = $("<p>").addClass("parkDescription").text(results[i].description);
    var parkDirections = $("<p>").addClass("parkAddress").text(results[i].directionsInfo);
    var parkfullName =  $("<p>").addClass("parkname").text(results[i].fullName);
    var parkState =  $("<p>").addClass("parkState").text(results[i].states);
    var parkWeather =  $("<p>").addClass("parkWeather").text(results[i].weatherInfo);
    parkDiv.append(parkDescription);
    parkDiv.append(parkDirections);
    parkDiv.append(parkfullName);
    parkDiv.append(parkState);
    parkDiv.append(parkWeather);
    $("#park").prepend(parkDiv);
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
  

})
});


 }
 })
 });

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map
var infoWindow;
var danger_level;
var country;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 16
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude
      var pos = {lat,lng};
	

      console.log( "ready!" );
		var temp = ""+lat+","+lng
      	var requestURL = 'http://api.apixu.com/v1/current.json?key=63e4861ad5c64304a22115741172110&q='+temp;
	  
		  console.log("getting country")
		  $.getJSON(requestURL, function(data) {
			  country = data.location.country;
			  var CountryDisplay = $("#area");
			  CountryDisplay.append("Current Country: "+country);
			  console.log(country)
			  
			$.getJSON("http://192.168.43.212:3000/cities/?format=json",function(data){	
			for (var i = 0; i < data.length; i++) {
			  console.log(data[i].theCountry);
				  if (data[i].theCountry === country) {
					danger_level = data[i].dangerLevel;
					break;
					console.log("yay");
				  }
			  }
			  console.log(danger_level);
			  $("#danger_level").append("Current Danger Level: "+danger_level);
			  if (danger_level >= 9) {
				document.getElementById("danger_level").style.color = "#C63232";
			  } else if (danger_level >= 7) {
				document.getElementById("danger_level").style.color = "#EA8F33";
			  } else if (danger_level >= 4) {
				document.getElementById("danger_level").style.color = "#EAE548";
			  } else if (danger_level > 1) {
				document.getElementById("danger_level").style.color = "#74BD49";
			  }
			});
		  })
		
     infoWindow.setPosition(pos);
     infoWindow.setContent('Location found.');
     infoWindow.open(map);
     map.setCenter(pos);

		  var str = "I'm here!"
          var result = str.link("https://www.google.com/maps/search/?api=1&query="+temp);
          document.getElementById("SMS").innerHTML = "SMS Containing (Please help, I need medical assistance! "+result+") has been sent to local Emergency Medical Services";
		
		
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed. Please make sure to give access when asked' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

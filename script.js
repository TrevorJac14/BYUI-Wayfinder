// Custom locations with their latitudes and longitudes
const customLocations = [
  { name: "The MC", lat: 43.82024764683613, lng: -111.77471459817133 },
  { name: "Library", lat: 43.818, lng: -111.785 },
  { name: "The STC", lat: 43.81461196463408, lng: -111.78429133339502 }
];

// Initialize the map when the button is clicked
document.getElementById("loadMapButton").addEventListener("click", function() {
  // Create the script element to load the Google Maps API dynamically
  var script = document.createElement("script");
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAxb-BbbqZrcztOtVAk1Mq0lvcsDVKDtNY&callback=initMap";
  script.async = true;
  document.body.appendChild(script);
});

// Function to initialize the map after the Google Maps API script loads
function initMap() {
  // Set the center of the map to BYU-Idaho coordinates
  var center = { lat: 43.81469478097646, lng: -111.78321122855117 };
  
  // Create the map centered at BYU-Idaho
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: center
  });

  // Place a marker at BYU-Idaho's center
  var marker = new google.maps.Marker({
    position: center,
    map: map,
    title: "BYU-Idaho"
  });

  // Add markers for custom locations
  customLocations.forEach(function(location) {
    var locationMarker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name
    });

    // Add an info window to show the location name
    var infoWindow = new google.maps.InfoWindow({
      content: location.name
    });

    // Show info window when the marker is clicked
    locationMarker.addListener("click", function() {
      infoWindow.open(map, locationMarker);
    });
  });

  // Handle location selection from dropdown
  document.getElementById("startLocation").addEventListener("change", function() {
    calculateRoute(map);
  });

  document.getElementById("destinationLocation").addEventListener("change", function() {
    calculateRoute(map);
  });
}

// Function to calculate the route from start to destination
function calculateRoute(map) {
  var startLocation = document.getElementById("startLocation").value;
  var destinationLocation = document.getElementById("destinationLocation").value;

  if (startLocation && destinationLocation) {
    // Find start and destination coordinates from custom locations
    var startCoords = customLocations.find(loc => loc.name === startLocation);
    var destinationCoords = customLocations.find(loc => loc.name === destinationLocation);

    // If both locations are valid
    if (startCoords && destinationCoords) {
      var directionsService = new google.maps.DirectionsService();
      var directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      var request = {
        origin: { lat: startCoords.lat, lng: startCoords.lng },
        destination: { lat: destinationCoords.lat, lng: destinationCoords.lng },
        travelMode: google.maps.TravelMode.WALKING
      };

      // Request the route and render it on the map
      directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsRenderer.setDirections(result);
        } else {
          alert("Could not find route: " + status);
        }
      });
    }
  }
}
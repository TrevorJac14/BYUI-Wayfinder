let map;
const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();

const customLocations = [
  { name: "The MC", lat: 43.82024764683613, lng: -111.77471459817133 },
  { name: "Library", lat: 43.818, lng: -111.785 },
  { name: "The STC", lat: 43.81461196463408, lng: -111.78429133339502 }
];

// Load Google Maps API dynamically when the map is requested
function loadMap() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAxb-BbbqZrcztOtVAk1Mq0lvcsDVKDtNY&callback=initMap`;
  script.async = true;
  document.body.appendChild(script);
}

// Initialize the map after API is loaded
function initMap() {
  // Make the map visible
  document.getElementById('map').style.display = 'block';

  // Initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 40.769, lng: -73.983 },
    zoom: 16
  });

  directionsRenderer.setMap(map);

  // Add custom markers
  customLocations.forEach(location => {
    const marker = new google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.name
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h3>${location.name}</h3>`
    });

    marker.addListener('click', function() {
      infoWindow.open(map, marker);
    });
  });

  // Disable the "Load Map" button after the map is loaded
  document.getElementById('loadMapButton').disabled = true;
}

// Handle the location selection from dropdown
function selectLocation() {
  const locationIndex = document.getElementById('locationSelector').value;
  if (locationIndex !== "") {
    const selectedLocation = customLocations[locationIndex];
    map.panTo({ lat: selectedLocation.lat, lng: selectedLocation.lng });
    map.setZoom(16);
    calculateRoute(selectedLocation);
  }
}

// Calculate the walking route from the default location to the selected location
function calculateRoute(destination) {
  const request = {
    origin: { lat: 40.769, lng: -73.983 }, // Starting point (e.g., current location)
    destination: { lat: destination.lat, lng: destination.lng },
    travelMode: google.maps.TravelMode.WALKING
  };

  directionsService.route(request, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    } else {
      alert("Directions request failed due to " + status);
    }
  });
}

let map;
let marker;

// Function to load Google Maps API dynamically
function loadGoogleMapsAPI() {
  if (document.getElementById('googleMapsScript')) {
    console.log("Google Maps API is already loaded.");
    return;
  }

  const script = document.createElement('script');
  script.id = 'googleMapsScript';
  script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

// Initialize the map
function initMap() {
  const centerLocation = { lat: 43.8141, lng: -111.7841 };

  map = new google.maps.Map(document.getElementById("map"), {
    center: centerLocation,
    zoom: 16,
  });

  marker = new google.maps.Marker({
    position: centerLocation,
    map: map,
    title: "BYU-Idaho Center",
  });

  document.getElementById("map").style.display = "block"; // Show map
}

// Update marker based on dropdown selection
function updateMarker() {
  const select = document.getElementById('buildingSelect');
  const [lat, lng] = select.value.split(',').map(Number);
  const location = { lat, lng };

  map.setCenter(location);
  marker.setPosition(location);
}

// Event Listeners
document.getElementById('loadMapButton').addEventListener('click', loadGoogleMapsAPI);
document.getElementById('buildingSelect').addEventListener('change', updateMarker);

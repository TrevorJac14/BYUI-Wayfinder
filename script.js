let map;

function initMap() {
  // Set the initial location (you can adjust this to your campus coordinates)
  const campusLocation = { lat: 43.8186, lng: -111.7836 }; // Example: BYU-Idaho coordinates

  // Initialize the map
  map = new google.maps.Map(document.getElementById('map'), {
    center: campusLocation,
    zoom: 16,
  });

  // Add a marker for the initial view
  new google.maps.Marker({
    position: campusLocation,
    map: map,
    title: "Welcome to Campus!",
  });
}

document.getElementById('find-route').addEventListener('click', () => {
  const start = document.getElementById('start').value;
  const destination = document.getElementById('destination').value;

  if (!start || !destination) {
    alert('Please enter both a starting point and a destination.');
    return;
  }

  alert(`Finding the best route from ${start} to ${destination}!`);
});

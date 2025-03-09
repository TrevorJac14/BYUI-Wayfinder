// Initialize and add the map
function initMap() {
    // The location of BYU-Idaho (adjust to your campus location)
    const campus = { lat: 43.7100, lng: -116.9380 };
    
    // The map, centered at BYU-Idaho
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: campus,
    });

    // Adding a marker for BYU-Idaho (or you can add more markers for other buildings)
    const marker = new google.maps.Marker({
        position: campus,
        map: map,
        title: "BYU-Idaho",
    });
}

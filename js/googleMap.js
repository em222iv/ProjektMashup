/**
 * Created by erikmagnusson on 12/12/14.
 */
function initialize() {
    var mapOptions = {
        center: { lat: 63.606943, lng: 15.721007},
        zoom: 5
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);
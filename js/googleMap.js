var geocoder;

function init(){


    map.initialize();
}
var map = {

    map:undefined,

    initialize:function() {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(61.23026,14.91776);
        var styles = [
            {
                featureType: "all",
                stylers: [
                    { saturation: -80 }
                ]
            },{
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                    { hue: "#00ffee" },
                    { saturation: 50 }
                ]
            },{
                featureType: "poi.business",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ];
        // Create a new StyledMapType object, passing it the array of styles,
        // as well as the name to be displayed on the map type control.
        var styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"});



        var mapOptions = {
            center: latlng,
            zoom: 5,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
            }
        };

        this.map = new google.maps.Map(document.getElementById('map-canvas',styledMap),
            mapOptions);

        this.map.mapTypes.set('map_style', styledMap);
        this.map.setMapTypeId('map_style');
    }
}

function codeAddress() {

    var address = localStorage.getItem("chosenRegionName");
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results[0].geometry.location);
            var infoWindow = new google.maps.InfoWindow({
             map: map.map,
             position: results[0].geometry.location,
             content: localStorage.getItem("chosenRegionName")

             });
            map.map.setCenter(infoWindow.getPosition());
            map.map.setZoom(7);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    var json = $.parseJSON(localStorage.getItem("filtered"));
    console.log(json);
    var count = 0;
    var i = 0;
    for(i;i < json.length;i++){

        var address = json[i];
        console.log(address);
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                var hej = new google.maps.InfoWindow({
                map: map.map,
                position: results[0].geometry.location,
                content: json[count]
                });
                    console.log(hej);
                count++;
            }
        });
    }
}

window.addEventListener(window,'load', init())
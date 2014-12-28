var geocoder;
var markersArray = [];
var marker;
var infowindow;
var infowWindowsArray = [];
prev_infoWindow=false;

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

    for (var i=0;i<markersArray.length;i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];

    var address = localStorage.getItem("chosenRegionName");
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log(results[0].geometry.location);

            var infoWindow = new google.maps.InfoWindow({
                visible:false,
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

    var count = 0;
    var i = -1;
    for(i;i < json.length;i++){
        var address = json[i];

        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {

                infowindow = new google.maps.InfoWindow({
                    content: json[count]
                });
                infowWindowsArray.push(infowindow);

                marker = new google.maps.Marker({
                map: map.map,
                position: results[0].geometry.location,
                content: json[count]

                });

                markersArray.push(marker);
                count++;

            }
            createInfoWindow(json);


            });


    }
}

function createInfoWindow(markerContent) {

    google.maps.event.addListener(marker, 'click', (function(marker) {
        return function(){
            if(prev_infoWindow){
                prev_infoWindow.close();
            }

            var infoWindowContent = createListOfRegionArticles(marker.content);

            infowindow = new google.maps.InfoWindow({
                content: infoWindowContent.toString()

            });
            prev_infoWindow = infowindow;



            infowindow.open(map.map,marker);
        }
    })(marker))
}

function createListOfRegionArticles(chosenRegionMarker) {
    var previousSearch = $.parseJSON(localStorage.getItem("previousSearch"));
    var list = [];

    for(var i = 0; i < previousSearch.SearchResult.Node.length;i++){
        if(chosenRegionMarker == previousSearch.SearchResult.Node[i].Location){
            var contentString = '<div border="1px solid black" id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">'+previousSearch.SearchResult.Node[i].Title+'</h1>'+
                '<div id="bodyContent">'+
                '<img alt="Smiley face" src='+previousSearch.SearchResult.Node[i].Thumbnail+'>'+
                '<p>'+previousSearch.SearchResult.Node[i].Key+'</p>'+
                '<a><p>Länk: '+previousSearch.SearchResult.Node[i].Url+'</p></a>'+
                '<p>'+previousSearch.SearchResult.Node[i].Price+' :-</p>'+
                '<p>'+previousSearch.SearchResult.Node[i].Location+' :-</p>'+
                '</div>'+
                '</div>';
                list.push(contentString);
        }
    }
    return list;

}


window.addEventListener(window,'load', init())
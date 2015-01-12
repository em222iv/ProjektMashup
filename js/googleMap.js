var geocoder;
var markersArray = [];
var marker;
var infowindow;
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
            disableDoubleClickZoom: true,
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

function codeAddress(searchJson) {
    for (var i=0;i<markersArray.length;i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];

    var address = localStorage.getItem("chosenRegionName");
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            //console.log(results[0].geometry.location);
            console.log(results);
            infoWindow = new google.maps.InfoWindow({
                visibility:hidden,
                map: map.map,
                position: results[0].geometry.location,
                content: localStorage.getItem("chosenRegionName")
             });
            map.map.setCenter(infoWindow.getPosition());
            map.map.setZoom(7);

        } else {
            //alert('Geocode was not successful for the following reason: ' + status);

        }
    });
    var json = null;
    json = $.parseJSON(localStorage.getItem("filtered"));

    var count = 0;
    for(var i = 0;i < json.length;i++){

        var place = json[i];
       // sleepFor(100);
       // console.log(i);
        geocoder.geocode( { 'address': place+" Sweden"}, function(results, status) {

            json[count] = results[0].formatted_address;
            //bugg sker här
            //adress skjuts in via address. tex. Nybro
            //Men vid vissa tillfällen så ger den ut fel address, den byter plats på olika värden i arrayen

            if (status == google.maps.GeocoderStatus.OK) {
               /* infowindow = new google.maps.InfoWindow({
                    content: json[count],
                    visible:false
                });
                infowWindowsArray.push(infowindow);*/
                //
                console.log(results[0].formatted_address)
                console.log(json[count])
                marker = new google.maps.Marker({
                    map: map.map,
                    draggable:true,
                    animation: google.maps.Animation.DROP,
                    content: json[count],
                    position:  results[0].geometry.location

                });

                /*google.maps.event.addListener(marker, 'click', function() {
                    map.map.setZoom(8)
                    map.map.setCenter(marker.getPosition());

                });*/
                markersArray.push(marker);
              //  console.log(marker);
                createInfoWindow(marker);
            //console.log(count);
            }
            count++;
        });
    }
}
function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
function createInfoWindow(currentMarker) {
    google.maps.event.addListener(currentMarker, 'click', (function(currentMarker) {
        return function(){
            if(prev_infoWindow){
                prev_infoWindow.close();
            }
            var infoWindowContent = ' <div class="panel panel-default"><div class="panel-heading"><form class="form-inline">'+createListOfRegionArticles(currentMarker.content)+'</form></div></div>';
            infowindow = new google.maps.InfoWindow({
                content: infoWindowContent.toString(),
                maxHeight:500,
                maxWidth:350,
                position: map.map.getCenter()

            });
            prev_infoWindow = infowindow;
            infowindow.open(map.map,currentMarker);


        }
    })(marker))
}

function createListOfRegionArticles(chosenRegionMarker) {
    var previousSearch = $.parseJSON(localStorage.getItem("previousSearch"));
    var list = [];
    var contentString = "";
    for(var i = 0; i < previousSearch.SearchResult.Node.length;i++){
        if(chosenRegionMarker == previousSearch.SearchResult.Node[i].Location){
            contentString = contentString +
                '<div border="1px solid black" class="form-group text-center" margin="50px">'+
                    '<div id="siteNotice">'+'</div>'+
                    '<h2 id="firstHeading" class="firstHeading">'+previousSearch.SearchResult.Node[i].Title+'</h2>'+
                    '<h4><p>Finns i: '+previousSearch.SearchResult.Node[i].Location+'</p></h4>'+
                    '<div id="bodyContent">'+
                    '<div class="well well-sm text-center" ><img alt="productPicture" src='+previousSearch.SearchResult.Node[i].Thumbnail+'></div>'+
                    //'<p>'+previousSearch.SearchResult.Node[i].Key+'</p>'+
                    '<div class="well well-sm text-center" ><a  target="_blank" href='+previousSearch.SearchResult.Node[i].Url+'><p>'+"Länk till objekt"+'</p></a></div>'+
                    '<div class="well well-sm text-center" ><p>Pris:'+previousSearch.SearchResult.Node[i].Price+' :-</p></div>'+
                    '<input type="button" id="saveArticle" name='+i+' class="btn btn-default btn-lg" value='+"Spara"+'></div><bold><hr/></bold>';
        }
    }
    list.push(contentString);
    return list;
}
window.addEventListener(window,'load', init())
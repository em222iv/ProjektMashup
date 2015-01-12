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
        //styling map
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
// takes searchquery as parameter, handles it and renders marker/infowindows
function codeAddress(searchJson) {
    //takes away all previous markers
    for (var i=0;i<markersArray.length;i++) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
    //render infowindow to present region of choice, also zooms to that position
    var address = localStorage.getItem("chosenRegionName");
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            infoWindow = new google.maps.InfoWindow({

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
    var json = null;
    json = $.parseJSON(localStorage.getItem("filtered"));
    //loops the places in region
    for(var i = 0;i < json.length;i++){
        var place = json[i];
        geocoder.geocode( { 'address': place+address+" Sweden"}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                //splits answer from geocode and optimizes it for matching blocket search result
                var split = results[0].formatted_address.split(',');
                var place = split[0];
                var a = json.indexOf(place);
                if(a==-1){
                    for(var a = 0;a < json.length;a++){
                        if(json[a].indexOf(place) !== -1){
                            place = json[a];
                        }
                    }
                }
                //create marker
                marker = new google.maps.Marker({
                    map: map.map,
                    draggable:false,
                    animation: google.maps.Animation.DROP,
                    content: place,
                    position:  results[0].geometry.location
                });
                //inserts markers into marker array, for a easy way to delete them when new search is made
                markersArray.push(marker);
                //sends marker to create infowindow for it
                createInfoWindow(marker);
            }
        });
    }
}
function createInfoWindow(currentMarker) {
    //click event for showing
    google.maps.event.addListener(currentMarker, 'click', (function(currentMarker) {
        return function(){
            //if clicking different markers, the previous infowindow will close
            if(prev_infoWindow){
                prev_infoWindow.close();
            }
            //create html string for infowindow
            var infoWindowContent =
                '<div class="panel panel-default"><div class="panel-heading"><form class="form-inline">'
                +createListOfRegionArticles(currentMarker.content)
                +'</form></div></div>';
            //infowindow is created
            infowindow = new google.maps.InfoWindow({
                content: infoWindowContent.toString(),
                maxHeight:500,
                maxWidth:350,
                position: map.map.getCenter()

            });
            prev_infoWindow = infowindow;
            //tells infowinow to open for this certain marker
            infowindow.open(map.map,currentMarker);
        }
    })(marker))
}
//funtion creates infowindow content string
function createListOfRegionArticles(chosenRegionMarker) {
    var previousSearch = $.parseJSON(localStorage.getItem("previousSearch"));
    var list = [];
    var contentString = "";
    //loops search result to get article info
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
/**
 * Created by erikmagnusson on 17/12/14.
 */
//takes searchRequest info as parameter
var search;
var cat ="";
var reg;
function searchLocations(data,searchResult,region,category) {
    var json;

    //keep result if search is the same as previous
    //else save new search to localstorage
    if(search == searchResult && cat == category && reg == region){
        return;
    }else {
        json = $.parseJSON(data);
        localStorage.removeItem("previousSearch");
        localStorage.setItem("previousSearch", JSON.stringify(json));
        json = $.parseJSON(localStorage.getItem("previousSearch"));
    }
    search = searchResult;
    cat = category;
    reg = region;

    //array to filter out region who has articles avaible
    var filteredLocations = [];
    //filtering regions from search result
    for (var i = 0; i < json.SearchResult.Node.length; i++) {

        var locations = json.SearchResult.Node.map(function(location) {
            return location['Location'];
        });

        var indexValue = $.inArray(locations[i],locations);

        if(indexValue == i && locations[i] != null){
            filteredLocations.push(locations[i]);
        }

    }
    localStorage.removeItem("filtered");
    localStorage.setItem("filtered", JSON.stringify(filteredLocations));
    codeAddress(json);
}


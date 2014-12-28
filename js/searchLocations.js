/**
 * Created by erikmagnusson on 17/12/14.
 */
function searchLocations() {
    $.ajax({
        url: "./jSON/search.json",
        //force to handle it as text
        dataType: "json",
        success: function(data) {
            //data downloaded so we call parseJSON function
            //and pass downloaded data
            var json = $.parseJSON(data);

            localStorage.setItem("previousSearch", JSON.stringify(json));
            json = $.parseJSON(localStorage.getItem("previousSearch"));

            var filteredLocations = [];
            for (var i = 0; i < json.SearchResult.Node.length; i++) {

              var locations = json.SearchResult.Node.map(function(location) {
                    return location['Location'];
                });

                var indexValue = $.inArray(locations[i],locations);

                if(indexValue == i && locations[i] != null){
                    filteredLocations.push(locations[i]);
                }

            }
            localStorage.setItem("filtered", JSON.stringify(filteredLocations));
            codeAddress();
        }
    })
    $.post(
        "APILocationCoordinates.php",
        {
            Locations: $.parseJSON(localStorage.getItem("filtered"))
        },
        function(data) {
            $('#stage').html(data);
        }
    );
}

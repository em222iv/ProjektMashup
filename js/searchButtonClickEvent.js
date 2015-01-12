/**
 * Created by erikmagnusson on 12/01/15.
 */
$("#searchButton").click(function(e) {
    //when searchbutton is clicked get value and filtering choices, save locally, toggle menu, post for php to make API request
    var seachquery = $("#searchInput").val();
    var category = localStorage.getItem("chosenCategory");
    var region = localStorage.getItem("chosenRegion");
    console.log(seachquery,category,region);
    console.log($("#region-dropdown").val());
    if ($('.bar').is('.ui-draggable-dragging')) {
        return false;
    }
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");

    $.post(
        "APISearch.php",
        {
            name: seachquery,
            category : category,
            region : region
        },
        function(data) {
            //send API request answer to extract info for google maps
            searchLocations(data,seachquery,region,category);
        }
    );
});


/*       var content = document.getElementById("page-content-wrapper");
 $("<div />").css({
 position: "absolute",
 width: "100%",
 height: "100%",
 left: 0,
 top: 0,
 zIndex: 1000000,  // to be on the safe side
 background: "url(./img/loading.gif) no-repeat 50% 50%"
 }).appendTo($(content).css("position", "relative"));

 setTimeout(function(){
 console.log('hej');
 content.lastElementChild.remove();
 }, 3000);*/



//The full path of the Award.php file in the web root
/*  $('body').click(function(e) {
 var target = $(e.target);
 console.log(target);
 });*/

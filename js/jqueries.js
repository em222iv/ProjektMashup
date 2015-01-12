/**
 * Created by erikmagnusson on 16/12/14.
 */
    //toggle on maptouch

    //make search/post to php

/*$(document).keypress(function(e) {
    if(e.which == 13) {
        $( "#searchButton" ).click();
    }
});*/
$("#saveArticle").click(function(e) {
    console.log(e);
});
$("#searchButton").click(function(e) {
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
            searchLocations(data,seachquery,region,category);
        }
    );
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

});

//The full path of the Award.php file in the web root
/*  $('body').click(function(e) {
 var target = $(e.target);
 console.log(target);
 });*/
var isDragging = false;
$("#map-canvas")
    .mousedown(function() {
        $(window).mousemove(function() {
            isDragging = true;
            $(window).unbind("mousemove");
        });
    })
    .mouseup(function() {
        var wasDragging = isDragging;
        isDragging = false;
        $(window).unbind("mousemove");
        if (!wasDragging) { //was clicking
            //do nothing
        }
    }).on("dblclick", function(e){
            $("#wrapper").toggleClass("toggled");
        //toggle on double-click
    });
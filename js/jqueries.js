/**
 * Created by erikmagnusson on 16/12/14.
 */
    //toggle on maptouch

    //make search/post to php
$("#searchButton").click(function(e) {
    if ($('.bar').is('.ui-draggable-dragging')) {
        return false;
    }
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $.post(
        "APISearch.php",
        { name: 'hej' },
        function(data) {
            $('#stage').html(data);
        }
    );

});
//The full path of the Award.php file in the web root

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
        $("#wrapper").toggleClass("toggled");
        }
    }).on("dblclick", function(e){
            e.preventDefault();  //cancel system double-click event
        });
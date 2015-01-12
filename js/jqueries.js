/**
 * Created by erikmagnusson on 16/12/14.
 */

//funtionality for interatacing. on doubleclick, show menu, on dragging, do nothing
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
/**
 * Created by erikmagnusson on 15/12/14.
 */

function init() {
    searchList();
}
function searchList() {
    $.ajax({
        url: "./jSON/search.json",
        //force to handle it as text
        dataType: "json",
        success: function(data) {
            //data downloaded so we call parseJSON function
            //and pass downloaded data
            var json = $.parseJSON(data);

            localStorage.setItem("categories", JSON.stringify(json));
            json = $.parseJSON(localStorage.getItem("categories"));
            console.log(json);
            //now json variable contains data in json format
            //let's display a few items
            
        }
    });
}

document.addEventListener("load", init());

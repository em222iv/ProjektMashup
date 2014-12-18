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

            localStorage.setItem("search", JSON.stringify(json));
            json = $.parseJSON(localStorage.getItem("search"));
            console.log(json);
            //now json variable contains data in json format
        }
    });
}


document.addEventListener("load", init());

/**
 * Created by erikmagnusson on 15/12/14.
 */
function init() {

    localStorage.removeItem("categories");
    localStorage.removeItem("regions");
    categoryList();
    regionList();

}
function categoryList() {



    var categoryList = document.getElementById('category-dropdown');
    var chosenCategory = document.getElementById('chosenCategory');
    $.ajax({
        url: "./jSON/categories.json",
        //force to handle it as text
        dataType: "json",
        success: function(data) {
            //data downloaded so we call parseJSON function
            //and pass downloaded data
            var json = $.parseJSON(data);
            localStorage.setItem("categories", JSON.stringify(json));
            json = $.parseJSON(localStorage.getItem("categories"));

            //now json variable contains data in json format
            //let's display a few items
            iterateRenderList(json.categories.category,categoryList);
        }
    });
}
function regionList() {
    var regionList = document.getElementById('region-dropdown');
    $.ajax({
        url: "./jSON/regions.json",
        //force to handle it as text
        dataType: "json",
        success: function(data) {

            //data downloaded so we call parseJSON function
            //and pass downloaded data
            var json = $.parseJSON(data);
            localStorage.setItem("regions", JSON.stringify(json));
            json = $.parseJSON(localStorage.getItem("regions"));

            iterateRenderList(json.regions.region,regionList);
        }
    });
}

function iterateRenderList(json,element) {

    for (i = 0; i < json.length; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
       // var id = document.createAttribute('id');

        li.appendChild(a);
        a.setAttribute("id", json[i]['@value']);
        var categoryname = json[i]['#text'];

        a.textContent = categoryname;
        element.appendChild(li);

    }
}
document.addEventListener("load", init());
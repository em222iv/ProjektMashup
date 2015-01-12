/**
 * Created by erikmagnusson on 15/12/14.
 */
function init() {
    //remove to update locaStorage
    localStorage.removeItem("categories");
    localStorage.removeItem("regions");
    categoryList();
    regionList();
}
function categoryList() {

    var categoryList = document.getElementById('category-dropdown');
    //get content of category file
    $.ajax({
        url: "./jSON/categories.json",
        //force to handle it as text
        dataType: "json",
        success: function(data) {
            //save to localstorage and send to rendering
            var json = $.parseJSON(data);
            localStorage.setItem("categories", JSON.stringify(json));
            json = $.parseJSON(localStorage.getItem("categories"));
            iterateRenderList(json.categories.category,categoryList);
        }
    });
}
function regionList() {
    var regionList = document.getElementById('region-dropdown');
    // get content of region file
    $.ajax({
        url: "./jSON/regions.json",
        //force to handle it as text
        dataType: "json",
        success: function(data) {
            //save to localstorage and send to rendering
            var json = $.parseJSON(data);
            localStorage.setItem("regions", JSON.stringify(json));
            json = $.parseJSON(localStorage.getItem("regions"));
            iterateRenderList(json.regions.region,regionList);
        }
    });
}
//render dropdown lists
function iterateRenderList(json,element) {

    for (i = 0; i < json.length; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        li.appendChild(a);
        a.setAttribute("class","catList");
        a.setAttribute("id", json[i]['@value']);
        var categoryname = json[i]['#text'];
        a.textContent = categoryname;
        element.appendChild(li);

    }
}
document.addEventListener("load", init());
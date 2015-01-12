/**
 * Created by erikmagnusson on 15/12/14.
 */
/**
 * Created by erikmagnusson on 15/12/14.
 */

function init() {
    chosenCategory();
    chosenRegion();
}
function chosenCategory() {

    //var chosenCategory = document.getElementById('chosenCategory');
    $('#category-dropdown').click(function(v){
        localStorage.setItem("chosenCategory", v.target.id);
        localStorage.setItem("chosenCategoryName", v.target.text);
       // chosenCategory.textContent = v.target.text;
        document.getElementById("dropdownMenu2").innerText= localStorage.getItem("chosenCategoryName");
    });
}
function chosenRegion() {
    //var chosenRegion = document.getElementById('chosenRegion');
    $('#region-dropdown').click(function(v){
        localStorage.setItem("chosenRegion", v.target.id);
        localStorage.setItem("chosenRegionName", v.target.text);
        console.log(localStorage.getItem("chosenRegionName"));
      //  chosenRegion.textContent = v.target.text;
        document.getElementById("dropdownMenu1").innerHTML=localStorage.getItem("chosenRegionName");
    });
}
document.addEventListener("load", init());

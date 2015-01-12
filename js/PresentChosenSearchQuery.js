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
//present and handle filtering search filtering choices for to remember last search
function chosenCategory() {
    $('#category-dropdown').click(function(v){
        localStorage.setItem("chosenCategory", v.target.id);
        localStorage.setItem("chosenCategoryName", v.target.text);
        document.getElementById("dropdownMenu2").innerText= localStorage.getItem("chosenCategoryName");
    });
}
function chosenRegion() {
    $('#region-dropdown').click(function(v){
        localStorage.setItem("chosenRegion", v.target.id);
        localStorage.setItem("chosenRegionName", v.target.text);
        document.getElementById("dropdownMenu1").innerHTML=localStorage.getItem("chosenRegionName");
    });
}
document.addEventListener("load", init());

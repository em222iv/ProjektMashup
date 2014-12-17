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

    var chosenCategory = document.getElementById('chosenCategory');
    $('#category-dropdown').click(function(v){
        localStorage.setItem("chosenCategory", v.target.id);

        chosenCategory.textContent = v.target.text;
    });
}
function chosenRegion() {

    var chosenRegion = document.getElementById('chosenRegion');
    $('#region-dropdown').click(function(v){
        localStorage.setItem("chosenRegion", v.target.id);

        chosenRegion.textContent = v.target.text;
    });
}
document.addEventListener("load", init());

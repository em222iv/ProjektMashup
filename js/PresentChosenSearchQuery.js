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
        console.log(v.target.text);
        chosenCategory.textContent = v.target.text;
    });
}
function chosenRegion() {

    var chosenRegion = document.getElementById('chosenRegion');
    $('#region-dropdown').click(function(v){
        console.log(v.target.text);
        chosenRegion.textContent = v.target.text;
    });
}
document.addEventListener("load", init());

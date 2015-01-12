/**
 * Created by erikmagnusson on 12/01/15.
 */
//sets filtering choices to that of the previous search, even though connection lost or having left site
$(document).ready(function() {
    console.log(localStorage.getItem("chosenCategoryName"));
    if(localStorage.getItem("chosenCategoryName")==null || localStorage.getItem("chosenRegionName")==null){
        localStorage.setItem("chosenCategoryName", "Kategorier");
        localStorage.setItem("chosenRegionName", "Län");
    }
    document.getElementById("dropdownMenu2").innerText= localStorage.getItem("chosenCategoryName");
    document.getElementById("dropdownMenu1").innerHTML=localStorage.getItem("chosenRegionName");
});

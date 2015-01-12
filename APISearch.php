<?php
include('Requests/library/Requests.php');
/**
 * Created by PhpStorm.
 * User: erikmagnusson
 * Date: 02/12/14
 * Time: 14:44
 */
new APISearch();

class APISearch {

    function __construct(){
        Requests::register_autoloader();
        if($_REQUEST["name"])
        {
            $category = 0;
            $region = 1;
            $searchquery = $_REQUEST['name'];
            $category = $_REQUEST['category'];
            $region = $_REQUEST['region'];

            $searchRequest = Requests::get("http://apfy.me/www.blocket.se/burken/Search?q=".$searchquery."&ca=".$region."&cg=".$category."&w=1&st=s&o=1&sp=0",array('x-apfy-authorization' => 'd42a86af-0176-4551-87f4-bc4089433664','x-apfy-accept' => 'application/json'));
            echo $searchRequest->body;
        }
    }
}

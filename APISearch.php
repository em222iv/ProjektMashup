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
            $searchquery = $_REQUEST['name'];

            $searchRequest = Requests::get("http://apfy.me/www.blocket.se/burken/Search?q=".$searchquery."&ca=18&w=1&st=s&o=1&sp=1",array('x-apfy-authorization' => 'd42a86af-0176-4551-87f4-bc4089433664','x-apfy-accept' => 'application/json'));
            var_dump($searchquery);
            file_put_contents('jSON/search.json',json_encode($searchRequest->body));
        }
    }
} 
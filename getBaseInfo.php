<?php
include('Requests/library/Requests.php');
/**
 * Created by PhpStorm.
 * User: erikmagnusson
 * Date: 02/12/14
 * Time: 14:44
 */
new GetBaseInfo();
class GetBaseInfo {
    public function __construct() {
// Next, make sure Requests can load internal classes
        Requests::register_autoloader();
        //write content to jsonfile
       /* $categoryRequest = Requests::get('http://apfy.me/www.blocket.se/burken/GetCategories',array('x-apfy-authorization' => 'd42a86af-0176-4551-87f4-bc4089433664','x-apfy-accept' => 'application/json'));
          $regionsRequest = Requests::get('http://apfy.me/www.blocket.se/burken/GetRegions',array('x-apfy-authorization' => 'd42a86af-0176-4551-87f4-bc4089433664', 'x-apfy-accept' => 'application/json'));

           file_put_contents('jSON/categories.json',json_encode($categoryRequest->body));
           file_put_contents('jSON/regions.json',json_encode($regionsRequest->body));*/
    }
}
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
/*        $fp = fopen('jSON/search.json', 'w');
        fwrite($fp, "{\"SearchResult\":{\"@currentPage\":\"1\",\"@pages\":\"5\",\"Node\":[{\"Title\":\"3-\u00e5rig Spinger Spaniel beh\u00f6ver ett nytt hem\",\"Key\":\"vasterbotten\/3_arig_Spinger_Spaniel_behover_ett_nytt_hem_58127819.htm\",\"Url\":\"http:\/\/www.blocket.se\/vasterbotten\/3_arig_Spinger_Spaniel_behover_ett_nytt_hem_58127819.htm?ca=2&w=1\",\"Added\":\"Idag 08:51\",\"Price\":\"2000\",\"Location\":\"Ume\u00e5\",\"Thumbnail\":\"http:\/\/cdn.blocket.com\/static\/1\/lithumbs\/42\/4290567592.jpg\"}");
        fclose($fp);*/
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
          //  file_put_contents('jSON/search.json',json_encode($searchRequest->body));

        }
    }
}

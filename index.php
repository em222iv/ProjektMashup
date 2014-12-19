
<!DOCTYPE html>
<?php
ini_set('include_path', 'C:\xampp\htdocs\phppot_samples\php_google_oauth_login\google-api-php-client\src');

require_once('getBaseInfo.php');
session_start();
require_once 'dbcontroller.php';

//Google API PHP Library includes
require_once 'Google/Client.php';
require_once 'Google/Service/Oauth2.php';

// Fill CLIENT ID, CLIENT SECRET ID, REDIRECT URI from Google Developer Console
$client_id = '<Your-Client-ID>';
$client_secret = '<Your-Client-Secret-Key>';
$redirect_uri = '<Callback-URL>';
$simple_api_key = '<Your-API-Key>';

//Create Client Request to access Google API
$client = new Google_Client();
$client->setApplicationName("PHP Google OAuth Login Example");
$client->setClientId($client_id);
$client->setClientSecret($client_secret);
$client->setRedirectUri($redirect_uri);
$client->setDeveloperKey($simple_api_key);
$client->addScope("https://www.googleapis.com/auth/userinfo.email");

//Send Client Request
$objOAuthService = new Google_Service_Oauth2($client);

//Logout
if (isset($_REQUEST['logout'])) {
    unset($_SESSION['access_token']);
    $client->revokeToken();
    header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL)); //redirect user back to page
}

//Authenticate code from Google OAuth Flow
//Add Access Token to Session
if (isset($_GET['code'])) {
    $client->authenticate($_GET['code']);
    $_SESSION['access_token'] = $client->getAccessToken();
    header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}

//Set Access Token to make Request
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
    $client->setAccessToken($_SESSION['access_token']);
}

//Get User Data from Google Plus
//If New, Insert to Database
if ($client->getAccessToken()) {
    $userData = $objOAuthService->userinfo->get();
    if(!empty($userData)) {
        $objDBController = new DBController();
        $existing_member = $objDBController->getUserByOAuthId($userData->id);
        if(empty($existing_member)) {
            $objDBController->insertOAuthUser($userData);
        }
    }
    $_SESSION['access_token'] = $client->getAccessToken();
} else {
    $authUrl = $client->createAuthUrl();
}
require_once("loginpageview.php")
?>
<HTML>
<HEAD>

    <style>
        .box {font-family: Arial, sans-serif;background-color: #F1F1F1;border:0;width:340px;webkit-box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);margin: 0 auto 25px;text-align:center;padding:10px 0px;}
        .box img{padding: 10px 0px;}
        .box a{color: #427fed;cursor: pointer;text-decoration: none;}
        .heading {text-align:center;padding:10px;font-family: 'Open Sans', arial;color: #555;font-size: 18px;font-weight: 400;}
        .circle-image{width:100px;height:100px;-webkit-border-radius: 50%;border-radius: 50%;}
        .welcome{font-size: 16px;font-weight: bold;text-align: center;margin: 10px 0 0;min-height: 1em;}
        .oauthemail{font-size: 14px;}
        .logout{font-size: 13px;text-align: right;padding: 5px;margin: 20px 5px 0px 5px;border-top: #CCCCCC 1px solid;}
        .logout a{color:#8E009C;}
    </style>
</HEAD>
<BODY>
<div class="heading">PHP Google OAuth 2.0 Login</div>
<div class="box">
    <div>
        <!-- Show Login if the OAuth Request URL is set -->
        <?php if (isset($authUrl)): ?>
            <img src="images/user.png" width="100px" size="100px" /><br/>
            <a class='login' href='<?php echo $authUrl; ?>'><img class='login' src="images/sign-in-with-google.png" width="250px" size="54px" /></a>
            <!-- Show User Profile otherwise-->
        <?php else: ?>
            <img class="circle-image" src="<?php echo $userData["picture"]; ?>" width="100px" size="100px" /><br/>
            <p class="welcome">Welcome <a href="<?php echo $userData["link"]; ?>" /><?php echo $userData["name"]; ?></a>.</p>
            <p class="oauthemail"><?php echo $userData["email"]; ?></p>
            <div class='logout'><a href='?logout'>Logout</a></div>
        <?php endif ?>
    </div>
</div>
</BODY>
</HTML>
</HTML>
<!--<html>
<head>
    <meta name="viewport" charset="UTF-8" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.css">
    <link href="css/simple-sidebar.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <style>
        html, body, #map-canvas {
            height: 100%;
            margin: 0px;
            padding: 0px
        }
        #panel {
            position: absolute;
            top: 5px;
            left: 50%;
            margin-left: -180px;
            z-index: 5;
            background-color: #fff;
            padding: 5px;
            border: 1px solid #999;
        }
    </style>
</head>
<body>
<div id="wrapper" class="">
     Sidebar
    <div id="sidebar-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <form action="#" method="post">
                    <div class="input-group">
                        <input  id="searchInput" type="text" name="name" class="form-control">
                         <span class="input-group-btn">
                            <input class=" btn btn-default"type="button" id="searchButton" value="Sök!" />
                        </span>
                    </div>
                </form>
                <div class="row">
                    <div class="col-lg-12">
                        <div  class="col-lg-5">
                            <label id="chosenRegion"></label>
                        </div>
                        <div class="col-lg-7">
                            <label id="chosenCategory"></label>
                        </div>
                    </div>
                </div>
                <!-- /input-group
            </div><!-- /.col-lg-6
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                        Län
                        <span class="caret"></span>
                    </button>
                    <ul id="region-dropdown" class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu2">
                    </ul>
                </div>

            </div><!-- /.col-lg-6

        </div><!-- /.row
        <div class="row">
            <div class="col-lg-12">
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                        Kategorier
                        <span class="caret"></span>
                    </button>
                    <ul id="category-dropdown" class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    </ul>
                </div>

            </div><!-- /.col-lg-6
        </div><!-- /.row
    </div>

    <!-- Page Content

    <div id="page-content-wrapper">
        <div id="map-canvas"></div>
    </div>
    <!-- /#page-content-wrapper
</div>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="js/bootstrap.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCN3etb_MUZAn64OCBYr8_DUQt-hFTUDzA"></script>
<script src="js/googleMap.js"></script>
<script src="js/infoWindows.js"></script>
<script src="http://assets.codepen.io/assets/common/stopExecutionOnTimeout-6c99970ade81e43be51fa877be0f7600.js"></script>
<script src="js/dropdownfunctionality.js"></script>
<script src="js/areaListsAppender.js"></script>
<script src="js/PresentChosenSearchQuery.js"></script>
<script src="js/searchQueryHandler.js"></script>
<script src="js/jqueries.js"></script>
<script src="js/searchLocations.js"></script>
</body>
</html>
-->
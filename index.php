
<!DOCTYPE html>

<?php
ini_set('include_path', 'C:\xampp\htdocs\phppot_samples\php_google_oauth_login\google-api-php-client\src');

require_once('getBaseInfo.php');
?>
<html /*MANIFEST="manifest.appcache"*/>
<head>
    <meta name="viewport" charset="UTF-8" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<div id="wrapper" class="">
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
            </div>
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
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="dropdown">
                    <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-expanded="true">
                        Kategorier
                        <span class="caret"></span>
                    </button>
                    <ul id="category-dropdown" class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    </ul>
                </div>
            </div>
        </div>
        <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
        </fb:login-button>
        <div id="status"></div>
        <div
            class="fb-like"
            data-share="true"
            data-width="450"
            data-show-faces="true">
        </div>
    </div>
    <div id="page-content-wrapper">
        <div id="map-canvas"></div>
    </div>
</div>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCN3etb_MUZAn64OCBYr8_DUQt-hFTUDzA"></script>
<script src="js/googleMap.js"></script>
<script src="js/dropdownfunctionality.js"></script>
<script src="js/areaListsAppender.js"></script>
<script src="js/PresentChosenSearchQuery.js"></script>
<script src="js/searchButtonClickEvent.js"></script>
<script src="js/jqueries.js"></script>
<script src="js/searchLocations.js"></script>
<script src="js/facebookLogin.js"></script>
<script src="js/previousFilteringChoices.js"></script>
<!--<script>

        if (navigator.onLine) {
            console.log('online');
        } else {
            console.log('offline');
        }

</script>-->
</body>
</html>

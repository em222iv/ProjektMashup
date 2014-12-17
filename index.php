<!DOCTYPE html>
<?php
require_once('getBaseInfo.php');
?>
<html>
<head>
    <meta name="viewport" charset="UTF-8" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.css">
    <link href="css/simple-sidebar.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
</head>
<body>
<div id="wrapper" class="">
    <!-- Sidebar -->
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
                <!-- /input-group -->
            </div><!-- /.col-lg-6 -->
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

            </div><!-- /.col-lg-6 -->

        </div><!-- /.row -->
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

            </div><!-- /.col-lg-6 -->
        </div><!-- /.row -->
    </div>

    <!-- Page Content -->

    <div id="page-content-wrapper">
        <div id="map-canvas"></div>
        <div class="container-fluid">
            <!--<a href="#menu-toggle" class="btn  btn-success" id="menu-toggle"></a>-->
        </div>
    </div>
    <!-- /#page-content-wrapper -->
</div>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="js/bootstrap.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLDuTsdr0DxY8uqPw6MlmEkru59bwo1gc"></script>
<script src="js/googleMap.js"></script>
<script src="http://assets.codepen.io/assets/common/stopExecutionOnTimeout-6c99970ade81e43be51fa877be0f7600.js"></script>
<script src="js/dropdownfunctionality.js"></script>
<script src="js/areaListsAppender.js"></script>
<script src="js/PresentChosenSearchQuery.js"></script>
<script src="js/searchQueryHandler.js"></script>
<script src="js/jqueries.js"></script>
</body>
</html>

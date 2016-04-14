<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>System Test</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Technologies">
    <meta name="description" content="Test">

    <link rel="shortcut icon" type="image/x-icon" href="web/img/test.ico"/>
	<link rel="icon" type="image/x-icon" href="web/img/test.png"/>
	<link rel="icon" type="image/vnd.microsoft.icon" href="web/img/test.png"/> 
  	
	<!-- jQuery (Antes de cargar Angular) -->
	<script src="web/libs/jquery/jquery-2.1.4.js"></script>
	
	<!-- ANGULAR -->
	<script src="web/libs/angular/angular.js"></script>
	<script src="web/libs/angular/angular-translate.js"></script>
	<script src="web/libs/angular/angular-translate-loader-static-files.js"></script>
	<script src="web/libs/angular/angular-sanitize.js"></script>
	
	<!-- Custom Scripts -->
	<script src="web/js/common.js"></script>
	<script src="web/app/loginApp.js"></script>
	
	<!-- ENDPOINTS -->
	<script src="https://apis.google.com/js/client.js?onload=initGapi"></script>
	
	<!-- Bootstrap Core CSS - Uses Bootswatch Flatly Theme: http://bootswatch.com/flatly/ -->
    <link href="web/css/lavish-bootstrap.css" rel="stylesheet">
	
    <!-- Custom CSS -->
    <link href="web/css/freelancer.css" rel="stylesheet">
    <link href="web/css/custom.css?v=1" rel="stylesheet">

	<!-- Modal -->
	<script src="web/libs/bootbox/bootbox.min.js"></script>
	
    <!-- Custom Fonts -->
    <link href="web/libs/font-awesome-4.2.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    
    <style type="text/css">
      /* Override some defaults */
      body {
        padding-top: 120px; 
      }
    </style>
    
</head>

<body>
<noscript>
	<style>#page-top {display: none;}</style>
    <p style='padding:10px'>
    Para utilizar las funcionalidades completas de este Sitio Web es necesario tener
	JavaScript habilitado. Por favor habilitalo. Si no sabes como, en el siguiente link
	se encuentran las instrucciones para hacerlo: <a href="http://www.enable-javascript.com/es/"
	target="_blank">http://www.enable-javascript.com/es/</a>.
    </p>
</noscript>

<div id="windowLoadingDiv"></div>
<div ng-app="loginApp" ng-controller="mainController" id="page-top" class="">    
	<!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
            	<a class="navbar-brand" href="">
                	<img src="web/img/logo.png"
                	style="width:10em; position:absolute; top:0; left:0;"/>
                </a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="hidden">
                        <a href="/"></a>
                    </li>
                    <li class="dropdown">
                    	<a href="#" class="dropdown-toggle" data-toggle="dropdown" translate>SOY_ADMIN<span class="caret"></span></a>
		                <ul class="dropdown-menu" role="menu">
		                  <li><a href="" translate>VENTAJAS_Y_BENEFICIOS</a></li>
		                  <li><a href="" translate>QUIERO_REGISTRARME</a></li>
		                </ul>
                    </li>
                    <li class="dropdown">
                    	<a href="#" class="dropdown-toggle" data-toggle="dropdown" translate>SOY_USER<span class="caret"></span></a>
		                <ul class="dropdown-menu" role="menu">
		                  <li><a href="" translate>VENTAJAS_Y_BENEFICIOS</a></li>
		                  <li><a href="" translate>QUIERO_REGISTRARME</a></li>
		                </ul>
                    </li>
                    <li class="dropdown">
                    	<a href="#" class="dropdown-toggle" data-toggle="dropdown" translate>IDIOMA<span class="caret"></span></a>
		                <ul class="dropdown-menu" role="menu">
		                  <li><a href="javascript:void(0)" ng-click="switchLanguage('es_MX')">Español</a></li>
		                  <li><a href="javascript:void(0)" ng-click="switchLanguage('en_US')">English</a></li>
		                </ul>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>	


    <div class="container">
		<div class="row">
			<div class="col-xs-10 col-xs-offset-1   col-sm-8 col-sm-offset-2   col-md-6 col-md-offset-3">
			  <div class="jumbotron">
			    <h3 translate>ACCESO</h3>
				<form role="form" id="form1">
				    <div class="form-group">
						 <label for="email1">{{ 'EMAIL' | translate }}</label>
						 <input type="email" class="form-control" id="email1" placeholder="e-mail" required autofocus/>
					</div>
					<div class="form-group">
						 <label for="password1" translate>PASSWORD</label>
						 <input type="password" class="form-control" id="password1" placeholder="{{ 'PASSWORD' | translate }}" required/>
					</div>
					<div class="form-group">
						 <select class="form-control" id="userType">
							<option value="1">{{ 'SOY_ADMIN' | translate}}</option>
							<option value="2">{{ 'SOY_USER' | translate}}</option>
						</select>
					</div>
					<button type="submit" class="btn btn-danger btn-lg center-block" style="min-width:170px;" translate ng-click="login()">ENTRAR</button>
					<br/>
				</form>
				<span style="font-color:black; font-weight:bold;">
					<a href="" translate>REGISTRATE_COMO_USER</a>
				</span>
			  </div>
			</div>
		</div>
	</div>
	<footer>

	</footer>
	<!-- FOOTER: Cargar al final los JS's -->	
    <!-- Bootstrap Core JavaScript -->
    <script src="web/libs/bootstrap/bootstrap.min.js"></script>	
</div>
</body>
</html>
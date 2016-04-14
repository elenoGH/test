<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Test</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Technologies">
    <meta name="description" content="Test">

    <link rel="shortcut icon" type="image/x-icon" href="../web/img/test.png"/>
	<link rel="icon" type="image/x-icon" href="../web/img/test.ico"/>
	<link rel="icon" type="image/vnd.microsoft.icon" href="../web/img/test.png"/> 
	<link href="../web/css/simple-sidebar.css" rel="stylesheet"><!-- menu left toogle -->
  	
	<!-- jQuery (Antes de cargar Angular) -->
	<script src="../web/libs/jquery/jquery-2.1.4.js"></script>
	<script src="../web/libs/jquery-plugins/jquery.ui.widget.js"></script>
	<script src="../web/libs/jquery-plugins/jquery.iframe-transport.js"></script>
	<script src="../web/libs/jquery-plugins/jquery.fileupload.js"></script>
	
	<!-- ANGULAR -->
	<script src="../web/libs/angular/angular.js"></script>
	<script src="../web/libs/angular/angular-route.js"></script>
	<script src="../web/libs/angular/angular-translate.js"></script>
	<script src="../web/libs/angular/angular-translate-loader-static-files.js"></script>
	<script src="../web/libs/angular/angular-sanitize.js"></script>
		
    <!-- api google maps -->
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&libraries=places&language=es-mx"></script>  
    <script src="../web/js/gmap-reg-consultorio.js"></script>
	
	<!-- Custom Scripts -->
	<script src="../web/js/common.js"></script>
	<script src="../web/app/servicioApp.js"></script>
	<script src="../web/app/Controllers/perfilControllers.js"></script>
	<script src="../web/app/Controllers/agendaControllers.js"></script>
	<script src="../web/app/Controllers/sistemasControllers.js"></script>
	<script src="../web/app/Controllers/proyectosControllers.js"></script>
	<script src="../web/app/Controllers/historialControllers.js"></script>
	
	<!-- ENDPOINTS -->
	
	
	<!-- Bootstrap Core CSS - Uses Bootswatch Flatly Theme: http://bootswatch.com/flatly/ -->
    <link href="../web/css/lavish-bootstrap.css" rel="stylesheet">
	
    <!-- Custom CSS -->
    <link href="../web/css/freelancer2.css" rel="stylesheet">
    <link href="../web/css/custom.css?v=1" rel="stylesheet">
    <link href="../web/css/my-responsive-table.css" rel="stylesheet">

	<!-- Modal -->
	<script src="../web/libs/bootbox/bootbox.min.js"></script>
	
    <!-- datePicker calendario (popup)-->
    <link href="../web/libs/jquery-ui/jquery-ui.min.css" rel="stylesheet">
	<script src="../web/libs/jquery-ui/jquery-ui.min.js"></script>
	
	<!-- FullCalendar -->
	<link href="../web/libs/fullcalendar-2.3.2/fullcalendar.css" rel="stylesheet">
	<script src="../web/libs/fullcalendar-2.3.2/moment.min.js"></script>
	<script src="../web/libs/fullcalendar-2.3.2/fullcalendar.min.js"></script>
	<script src="../web/libs/fullcalendar-2.3.2/lang-all.js"></script>

    <!-- Font Awesome -->
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    
    <!-- Editor wysiwyg -->
	<link href="http://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" rel="stylesheet">    
    <link href="../web/libs/editor-wysiwyg/prettify.css" rel="stylesheet"> 
    <link href="../web/libs/editor-wysiwyg/index.css" rel="stylesheet"> 
   
    <script src="../web/libs/editor-wysiwyg/jquery.hotkeys.js"></script>
    <script src="../web/libs/editor-wysiwyg/prettify.js"></script>
    <script src="../web/libs/editor-wysiwyg/bootstrap-wysiwyg.js"></script>
    <script src="../web/libs/editor-wysiwyg/mainEditor.js"></script>
    
	<!-- ng-table -->
    <script src="../web/libs/ngTable/ng-table.js"></script>
    <link href="../web/libs/ngTable/ng-table.css" rel="stylesheet">    
    
    <style type="text/css">
      /* Override some defaults */
      body {
        padding-top: 50px; 
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

<div ng-app="servicioApp" ng-controller="mainController" id="page-top" class="">

	<!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <a class="navbar-brand" href="#/bienvenido">
                	<img src="../web/img/test.png"
                	style="width:10em; position:absolute; top:0; left:0;"/>
                </a>
                <button type="button" class="navbar-toggle-2" id="menu-toggle">
                	<span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
        </div>
        <!-- /.container-fluid -->
    </nav>	


    <div id="wrapper">
        <!-- Sidebar -->
        <div id="sidebar-wrapper">
            <ul class="sidebar-nav">
                    <li class="dropdown">
                    	<a href="#/perfil" class="dropdown-toggle" data-toggle="dropdown">
                    	<i class="fa fa-lg fa-user-md"></i> {{ 'MENU_DOC_PERFIL' | translate }}</a>
                    </li>                
                    <li class="dropdown">
                    	<a href="#/proyectos" class="dropdown-toggle" data-toggle="dropdown">
                    	<i class="fa fa-lg fa-medkit"></i> {{ 'MENU_PROYECTOS' | translate }}</a>
                    </li>
                    <li class="dropdown">
                    	<a href="#/sistemas" class="dropdown-toggle" data-toggle="dropdown">
                    	<i class="fa fa-lg fa-tty"></i> {{ 'MENU_SISTEMAS' | translate }}</a>
                    </li>                    
                    <li class="dropdown">
                    	<a href="#/agenda" class="dropdown-toggle" data-toggle="dropdown">
                    	<i class="fa fa-lg fa-calendar"></i> {{ 'MENU_DOC_AGENDA' | translate }}</a>
                    </li>
                    <li class="dropdown">
                    	<a href="#/historial" class="dropdown-toggle" data-toggle="dropdown">
                    	<i class="fa fa-lg fa-archive"></i> {{ 'HISTORIAL' | translate }}</a>
                    </li>
                    <li class="dropdown">
                    	<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                    	<i class="fa fa-lg fa-language"></i> {{ 'IDIOMA' | translate }}</a>
		                <ul class="dropdown-menu" role="menu">
		                  <li><a href="javascript:void(0)" ng-click="switchLanguage('es_MX')">Español</a></li>
		                  <li><a href="javascript:void(0)" ng-click="switchLanguage('en_US')">English</a></li>
		                </ul>
                    </li>
                    <li class="dropdown">
                    	<a href="javascript:void(0)" ng-click="logout()" class="dropdown-toggle" data-toggle="dropdown">
                    	<i class="fa fa-lg fa-lock"></i> {{ 'MENU_SALIR' | translate }}</a>
                    </li>
            </ul>
        </div>
        <!-- /#sidebar-wrapper -->
        <!-- Page Content -->
        <div id="page-content-wrapper">
        	<div class="container-fluid" style="min-width:350px">
                <ng-view></ng-view>
            </div>
        	
        </div>
        <!-- /#page-content-wrapper -->
    </div>

	
	<!-- FOOTER: Cargar los siguientes elementos hasta el final -->	
    <!-- Bootstrap Core JavaScript -->
    <script src="../web/libs/bootstrap/bootstrap.min.js"></script>
	<script type="text/javascript">
		//Menu Toggle Script
	    $("#menu-toggle").click(function(e) {
	        e.preventDefault();
	        $("#wrapper").toggleClass("toggled");
	    });			
	</script>
	
</div>
</body>
</html>
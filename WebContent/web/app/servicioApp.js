
var app = angular.module('servicioApp', ['pascalprecht.translate', 'ngRoute']);

app.config(function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: '../web/app/languages/',
    suffix: '.json'
  });
  var lang = getCookie("language");
  if (lang == "") {
	  lang = "es_MX";
  }
  $translateProvider.use(lang);
  // Por seguridad, usar sanitize strategy = escaped
  $translateProvider.useSanitizeValueStrategy('escaped');
});

app.controller('mainController', function ($scope, $translate, $rootScope, $sce) {

	$scope.switchLanguage = function (key) {
		$translate.use(key);
        setCookie("language", key, 1000);
        if (key == "es_MX") {
        	key = "es";
        } else if (key == "en_US") {
        	key = "en-US";
        }
        // Si existe el elemento calendario (fullCalendar), destruirlo y volver a crearlo
        if ($('#calendar').length > 0) {
        	$('#calendar').fullCalendar('destroy');
        	initAgenda($scope, $translate);
        }
        if ($("#pacienteFechaNacimiento").length > 0) {
        	
        	$("#pacienteFechaNacimiento").datepicker("option", $.datepicker.regional[key]);
        	$("#fechaCita").datepicker("option", $.datepicker.regional[key]);
        	$("#pacienteFechaNacimiento").datepicker("option", "dateFormat", "dd/mm/yy");
        	$("#fechaCita").datepicker("option", "dateFormat", "dd/mm/yy");
        }
    };
    
    
	// INIT
	$scope.angularPostInitiation = function(idEndpointLoaded) {
		window.location = "#/bienvenido";
	}
	
    $scope.logout = function() {
    	// Borrar cookie tok
        setCookie("tid", "-");
        window.location = "/Test";
    };
    
    $rootScope.windowLocation = function(loc) {
    	window.location = loc;
    };
    
});


//############ MAPEO DE RUTAS #####################################################################

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/bienvenido", {templateUrl: "bienvenido.html", controller: "bienvenidoController"})
		.when("/perfil", {templateUrl: "perfil.html", controller: "perfilController"})
		.when("/agenda", {templateUrl: "agenda.html", controller: "agendaController"})
		.when("/sistemas", {templateUrl: "sistemas.html", controller: "sistemasController"})
		.when("/proyectos", {templateUrl: "proyectos.html", controller: "proyectosController"})
		.when("/historial", {templateUrl: "historial.html", controller: "historialController"})
		.otherwise({redirectTo: '/bienvenido'})
		;
}]);


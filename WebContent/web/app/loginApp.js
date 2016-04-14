
var app = angular.module('loginApp', ['pascalprecht.translate']);

var initGapi = function() {
	gapi.client.setApiKey(' AIzaSyDQSx67vNY-saFATyHuGmOH0nznTKuETY4 ');

	/*gapi.client.load('MyProject', 'v1', function(){
		angular.element(document.getElementById('page-top')).scope().angularPostInitiation();
	}, '//' + window.location.host + '/_ah/api');*/
}

app.config(function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'web/app/languages/',
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

app.controller('mainController', function ($scope, $translate) {

	$scope.switchLanguage = function (key) {
		$translate.use(key);
        setCookie("language", key, 1000);
    };
    
	// INIT
	$scope.angularPostInitiation = function() {
	    // load all your assets
		$("#page-top").toggleClass("mostrar");
		$("#windowLoadingDiv").toggleClass("ocultoTransicion");
	}
	
    $scope.login = function() {
    	
    	var params = {};
    	params.langKey = $translate.use();
    	params.tokType = 1;
    	params.mail = $("#email1").val();
    	params.pwd = $("#password1").val();
    	params.userType = $("#userType").val();
    	params.fieldLabels = $translate.instant("CORREO") + "|";
    	if (params.mail == "" || params.pwd == "") {
    		return;
    	} 
    	
    	// Show loading modal dialog
    	showLoadingMessage($translate);
    	callApi(null, "testEndpoint", "loginTest", $translate, params,
    		// If OK
    		function(resp) {
	        	// Redireccionar a la pagina que corresponda
	        	switch (resp.obj.userType) {
	        		case 1: window.location = "servicioApp"; break;
	        	}
    		},
    		// If reject
    		function(resp) {
    			showLoadingFinishedMessage(resp.message);
    		}
    	);
    	
    };
    
});



//############ REGISTRAR ASISTENTES CONTROLLER ##########################################

app.controller('regFormatoRecetaController', function($scope, $translate, $rootScope, $routeParams) {
	initEditorWysiwyg();
	var formatoObj = {};
	
		
	formatoObj.idFormato = $routeParams.idFormatoReceta;
	
	if(formatoObj.idFormato == 0){
		formatoObj.name = "Nombre";
		formatoObj.status = 1;
		formatoObj.txtPiePagIzq = "texto pie de pagina izquierdo";
		formatoObj.txtPiePagDer = "texto pie de pagina derecho";
	}else{

		
	}
	
	$scope.formato  = formatoObj;

	$scope.saveFormato = function() {
		showLoadingMessage($translate);
    	$scope.formato.fieldLabels = 
			$translate.instant("NOMBRE")
	+ "|" + $translate.instant("TAMANIO_PAPEL")
	;

	var parametros = $scope.formato;
	var txt_editor = $('#editor').cleanHtml();
//	callApi(1, "doctorEndpoint", "saveFormato", $translate, parametros, function(resp) {
//		showLoadingFinishedMessage("INFO_REGISTRADA_OK", $translate);
//		window.location = "#/perfil";
//	});		
	}
});
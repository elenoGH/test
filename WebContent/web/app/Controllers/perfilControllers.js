
// ############ BIENVENIDO CONTROLLER #######################################################################

app.controller('bienvenidoController', function ($scope, $translate, $rootScope) {
});


//############ PERFIL CONTROLLER #############################################################################

app.controller('perfilController', function ($scope, $translate, $rootScope) {
	//** Subir foto **//
	var sendData= true; 
	$('#uploadPhotoForm').fileupload({
        dataType: 'text',
        autoUpload: false,
        add : function(e, data) {
        	//$("#uploadPhotoButton").off("click").on("click", function() {
        		if (!sendData) return;
        		bootbox.confirm($translate.instant("CONFIRME_SUBIR_FOTO"), function(result) {
        			if(result == true) {
        				showLoadingMessage($translate);
        					$("#uploadPhotoForm").attr("action", true);
        					data.formData = $("#uploadPhotoForm").serializeArray();
    	        			sendData = false;
    	        			data.submit();
	        		}
        		});
        	//});
        },
        done: function (e, data) {
        	sendData = true;
        	var sResult = data.result + "";
        	if (sResult.indexOf("_") == 0) {
        		showLoadingFinishedMessage($translate.instant("NO_SE_PUDO_SUBIR_LA_IMAGEN") + "<br/>" + sResult);
        	} else {
        		showLoadingFinishedMessage("IMAGEN_SUBIDA_OK", $translate);
        		$rootScope.userObj.cveImgFoto = sResult;
        		$("#imgFoto").attr("src", sResult); 
        	}
        }
    });
	//***//
	//inicializa variables de $scope
	$scope.oldPassword = "";
	$scope.newPassword = "";
	$scope.repeatPassword = "";
	$scope.oldMail = "";
	$scope.newMail = "";
	$scope.repeatMail = "";
	//implementa funciones para eventos click
	$scope.changePassword = function() {
    		if ($scope.oldPassword == "" || $scope.newPassword == "" || $scope.repeatPassword == "") {
    			bootbox.alert($translate.instant("LLENE_TODOS_LOS_CAMPOS"));
    			return;
    			
    		} else if($scope.newPassword != $scope.repeatPassword){
    			bootbox.alert($translate.instant("PASSWORDS_NO_COINCIDEN"));
    			return;
    		} else {
    			// Llamar al servicio
    			showLoadingMessage($translate);
    			var paramsArray = {
    					password : $scope.oldPassword,
    					newPassword : $scope.newPassword
    			};
    			callApi(1, "medi5Endpoint", "changeUserPassword", $translate, paramsArray, function(resp){
					showLoadingFinishedMessage("PASSWORD_MODIFICADO_OK", $translate);
					window.location = "#/perfil";
				});
    		}
    }
	$scope.changeMail = function() {	
		if ($scope.oldMail == "" || $scope.newMail == "" || $scope.repeatMail == "") {
			bootbox.alert($translate.instant("LLENE_TODOS_LOS_CAMPOS"));
			
		} else if($scope.newMail != $scope.repeatMail){
			bootbox.alert($translate.instant("MAIL_NO_COINCIDEN"));
			
		} else {
			// Llamar al servicio
			showLoadingMessage($translate);
			var paramsArray = {
					mail 	: $scope.oldMail,
					newMail : $("#newMail").val(),
					fieldLabel : $translate.instant("MAIL_NUEVO")
			};
			$scope.newMail = $scope.newMail;
			setTimeout(function(){ 
				showLoadingFinishedMessage("MAIL_MODIFICADO_OK", $translate);
				window.location = "#/perfil";
			}, 3000);
		}
		
	}
});
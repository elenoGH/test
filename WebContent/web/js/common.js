
var RespCodes = {};
RespCodes.OK = 1; // Todo OK
RespCodes.REJECT = 2; // Rechazo por sesion/usuario no valida/o
RespCodes.VALIDATION_ERRORS = 3; // Error de datos (validaciones)
RespCodes.EXCEPTION = 4; // Error de datos (validaciones)


/**
 * Quita los caracteres en blanco al inicio y fin de un string
 * @param s (string)
 * @returns
 */
function trim(s) {
    return s.replace(/^\s+|\s+$/gm,'');
}


/**
 * Remplaza todas las ocurrencias de 'find' en 'string' por el valor de 'replace'
 * @param string
 * @param find
 * @param replace
 * @returns
 */
function replaceAll(string, find, replace) {
	return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

/**
 * https://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
 * Regular expressions contain special (meta) characters, and as such it is dangerous to 
 * blindly pass an argument in the find function above without pre-processing it to escape those characters. 
 * This is covered in the Mozilla Developer Network's JavaScript Guide on Regular Expressions, 
 * where they present the following utility function:
 * @param string
 * @returns
 */
function escapeRegExp(string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

/**
 * Funcion que siempre devuelve un string.trim()
 * @param obj
 * @returns
 */
function getString(obj) {
	return obj==null || obj==undefined? "" : trim(obj + "");
}

/**
 * Funcion que devuelve un 0 si el string es vacio
 * @param obj
 * @returns
 */
function getStringOrZero(obj) {
	var s = obj==null || obj==undefined? "" : trim(obj + "");
	s = s==""? "0" : s;
	return s;
}

/**
 * 
 * @param cname
 * @param cvalue
 * @param exdays
 */
function setCookie(cname, cvalue, exdays) {
	
	var expires = "";
	
	if (exdays !== null && exdays !== undefined) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    expires ="; expires=" + d.toUTCString();
	}
	
    document.cookie = cname + "="+ cvalue + expires + "; path=/";

}

/**
 * 
 * @param c_name
 * @returns
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/**
 * Muestra mensaje modal "Cargando..."
 * @param translateNgObj Angular's $translate object
 * @returns
 */
function showLoadingMessage(translateNgObj) {
	var msg = translateNgObj? translateNgObj.instant("CARGANDO") : "Cargando..."; 
	bootbox.dialog({
		  message: msg,
		  closeButton: false,
		  animate: false
		});
}

/**
 * Muestra mensaje modal msg
 * @param msg
 * @param translateNgObj Angular's $translate object. Si es diferente de null, utiliza msg como llave para obtener un mensaje de es_MX.json ...
 * @param callbackFunction opcional
 * @returns
 */
function showLoadingFinishedMessage(msg, translateNgObj, callbackFunction) {
	if (translateNgObj) {
		msg = translateNgObj.instant(msg);
	}
	bootbox.hideAll()
	if (callbackFunction) {
		bootbox.alert({
			message: msg,
			animate: false,
			callback: callbackFunction
		});
	} else {
		bootbox.alert({
			message: msg,
			animate: false
		});
	}
}

/**
 * Cierra el modal
 */
function closeLoadingMessage() {
	bootbox.hideAll();
}


/**
 * Clona un objeto usando jquery
 * @param obj
 * @param deepCopyBool
 */
function cloneObject(obj, deepCopyBool) {
	if (deepCopyBool === true) {
		return jQuery.extend(true, {}, obj);
	} else {
		return jQuery.extend({}, obj);
	}
}

/**
 * Clona un objeto usando javascript plano
 * @param obj
 * @returns
 */
function cloneObjectX(obj) {
	
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = cloneObjectX(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = cloneObjectX(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
    
}


/**
 * Metodo reusable para invocar un servicio
 * @param userTypeInt (nullable) Si es != null, agrega a la peticion userType y tokenId (obteniendolo de la cookie respectiva)
 * @param endpointNameStr
 * @param apiMethodStr
 * @param translateNgObj (nullable)
 * @param paramsArray (nullable) parametros a enviar al servicio. var params = {}; params.param1 = XXX; ... 
 * @param functionOnSuccess
 * @param optionalFunctionOnReject (opcional)
 * @returns
 */
function callApi(userTypeInt, endpointNameStr, apiMethodStr, 
		translateNgObj, paramsArray, functionOnSuccess, optionalFunctionOnReject) {
	
	var req = {};
	var respObj = null;
	
	if (translateNgObj !== undefined && translateNgObj != null) {
		req.langKey = translateNgObj.use();
	} else {
		req.langKey = "-";
	}
	
	if (userTypeInt) {
		req.userType = userTypeInt;
		req.token = getCookie("tid");
	}
	
	if (paramsArray !== undefined && paramsArray != null) {
		for (var prop in paramsArray) {
		  if (paramsArray.hasOwnProperty(prop)) { 
			  // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
			  req[prop] = paramsArray[prop];
		  }
		}
	}
	
	var resp = {obj:{userType:1}};
	functionOnSuccess(resp);
	
}



//##################################### VALIDACION DE CAMPOS ###########################################//

/**
 * 
 */
function getKey(evt){
	if (!evt) var evt = window.event;
	var k;
	if (!(evt.which == undefined)) k = evt.which;
	else if (!(evt.keyCode == undefined)) k = evt.keyCode;
	return k;
}

// NOTE:   Backspace = 8,    Enter = 13, 
//       0 = 48,   9 = 57
//       A = 65,   Z = 90,   a = 97,   z = 122, 
//       Ã± = 241,  Ã‘ = 209,
//       Ã¡ = 225,  Ã� = 193,  Ã© = 233,  Ã‰ = 201, Ã­ = 237, Ã� = 205,
//       Ã³ = 243,  Ã“ = 211,  Ãº = 250,  Ãš = 218, Ã¼ = 252, Ãœ = 220
//       - = 45,   ( = 40,   ) = 41,     = 32, 
//       _ = 95,   . = 46,   , = 44,   @ = 64
//       # = 35,   & = 38,   / = 47,   ' = 39, Â¿ = 191, Â¡ = 161

function acceptNum(evt){ 
	var k = getKey(evt);
	return (k <= 13 || (k >= 48 && k <= 57));
}

function acceptDouble(evt){
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (k<=13 || acceptNum(evt) || c==".");
}

function acceptLatinChars(evt){ 
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (k==241 || k==209 || k==225 || k==193 || k==233 || k==201
			 || k==237 || k==205 || k==243 || k==211 || k==250 || k==218
			 || k==252 || k==220);
}

function acceptLettersNoLatin(evt){
	var k = getKey(evt);
	return (k<=13 || (k>=65 && k<=90) || (k>=97 && k<=122));
}

function acceptLetters(evt){
	var k = getKey(evt);
	return (acceptLettersNoLatin(evt) || acceptLatinChars(evt));
}

function acceptAlfaNum(evt){
	return (acceptLetters(evt) || acceptNum(evt));
}

function acceptAlfaNumNoLatin(evt){
	return (acceptLettersNoLatin(evt) || acceptNum(evt));
}

function acceptPhone(evt){ 
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (k<=13 || acceptNum(evt) || c=="+" || c=="-" || c=="(" || c==")");
}

function acceptName(evt){ 
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (acceptLetters(evt) || c==" " || c==".");
}

function acceptCompany(evt){
	return acceptName(evt) || acceptNum(evt);
}

function acceptTitle(evt){
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (acceptAlfaNum(evt) || 
		c==" " || c=="." || c=="#" || c=="-" || c=="_" || c=="(" || c==")");
}

function acceptAddress(evt){
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return acceptName(evt) || acceptPhone(evt) || c=="#" || c=="," || c=="/";
}

function acceptEmail(evt){
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return acceptNum(evt) || acceptLetters(evt) || c=="@" || c=="." || c=="-" || c=="_";
}

function acceptWebPage(evt){
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return acceptNum(evt) || acceptLetters(evt) || c==":" || c=="/" || c=="." || c=="-" || c=="_";
}

function acceptUserName(evt){
	var k = getKey(evt);
	return acceptNum(evt) || acceptLettersNoLatin(evt) || k==46 || k==95;
}

function acceptPassword(evt){
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return acceptNum(evt) || acceptLettersNoLatin(evt) || c=="#" || c=="@" || c=="$";
}

function acceptDate(evt){ 
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (acceptNum(evt) || c=="-" || c=="/");
}

function acceptHour(evt){ 
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (acceptNum(evt) || c==":");
}


function acceptOtherChars(evt){
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (k==191 || k==161 ||   // Â¿ Â¡
			c=="!" || c=="#" || c=="$" || c=="%" || c=="'" || c=="\"" ||
			c=="&" || c=="/" || c=="(" || c==")" || c=="[" || c=="]" || 
			c=="=" || c=="?" || c=="\\" || c=="*" || c=="-" || c=="_" || 
			c=="+" || c=="@" || c=="." || c==":" || c=="," || c==";" || c==" "
			);
}


function acceptReducedChars(evt){
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (c=="#" || c=="%" || 
			c=="/" || c=="(" || c==")" || 
			c=="\\" || c=="*" || c=="-" || c=="_" || 
			c=="." || c==":" || c=="," || c==";" || c==" "
			);
}

/*
 *  Note: Following characters cause conflicts when used with JSON: ' " & +
 *  
 */


function acceptDescription(evt){
	return (acceptAlfaNum(evt) || acceptName(evt) || acceptOtherChars(evt));
}


function acceptShortDescription(evt){
	return (acceptAlfaNum(evt) || acceptName(evt) || acceptReducedChars(evt));
}

function acceptCommaSeparatedValues(evt){
	var k = getKey(evt);
	var c = String.fromCharCode(k);
	return (acceptAlfaNum(evt) || c=="_" || c==",");
}



/**
 * This function can be used with above functions.
 * Ex: <input ... onkeypress="return acceptPhone(event) && enterTyped(event, validateAndSend)">
 * @param evt
 * @param functToValidateAndSubmit String of function to invoke with eval. Ex "myFunction()"
 * @returns {Boolean}
 */
function enterTyped(evt, functToValidateAndSubmit){
	var k = getKey(evt);
	if(k == 13){
		return eval(functToValidateAndSubmit);
	}
	return true;
}


/**
 * Busca un objeto dentro de un array, mediante un id.
 * Ejemplo: var usrObj = searchObjectInArray(array, 'idUsr', 50);
 * @param array
 * @param propStr
 * @param id
 * @returns
 */
function searchObjectInArray(array, propStr, id) {
	
	var obj = null;
	
	for (var i=0; i < array.length; i++) {
		var objTmp = array[i];
		if (objTmp[propStr] == id) {
			obj = objTmp;
			break;
		}
	}
	
	return obj;
	
}

//######################################################################################################//

/**
 * Funcion para crear y mostrar un selector de fecha asociado a un div (dateDivId).
 *  
 */
function initDatePicker(){
	
//	var lenguaES = $.datepicker.regional['es'] = {
//			closeText: 'Cerrar',
//			prevText: '&#x3C;Ant',
//			nextText: 'Sig&#x3E;',
//			currentText: 'Hoy',
//			monthNames: ['enero','febrero','marzo','abril','mayo','junio',
//			'julio','agosto','septiembre','octubre','noviembre','diciembre'],
//			monthNamesShort: ['ene','feb','mar','abr','may','jun',
//			'jul','ago','sep','oct','nov','dic'],
//			dayNames: ['domingo','lunes','martes','miÃ©rcoles','jueves','viernes','sÃ¡bado'],
//			dayNamesShort: ['dom','lun','mar','miÃ©','jue','vie','sÃ¡b'],
//			dayNamesMin: ['D','L','M','X','J','V','S'],
//			weekHeader: 'Sm',
//			dateFormat: 'dd/mm/yy',
//			firstDay: 1,
//			isRTL: false,
//			showMonthAfterYear: false,
//			yearSuffix: ''};	
//	$.datepicker.setDefaults(lenguaES);
	
	$.datepicker.setDefaults($.datepicker.regional['es']);
	
	// La siguiente linea es para cambiar el idioma, esto debido a que fullcalendar ya
	// integra las traducciones (http://fullcalendar.io/docs/text/lang/).
	// $("#"+dateDivId).datepicker("option", $.datepicker.regional["fr"]);
	// $("#"+dateDivId).datepicker("option", "dateFormat", "dd/mm/yy");
	
}

/**
 * Funcion para renderizar los tooltips de la pagina actual.
 * Nota: Se realiza mediante un setTimeout para que funcione con Angular.
 */
function toolTip(){
	setTimeout("$('[data-toggle=\"tooltip\"]').tooltip();", 300);
}

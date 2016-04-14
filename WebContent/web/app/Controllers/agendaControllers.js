//############ AGENDA CONTROLLER #######################################################################

app.controller('agendaController', function($scope, $translate, $rootScope, $routeParams) {
	
	initAgenda($scope, $translate);
	
});



/**
 * Inicializa y muestra el calendario de FullCalendar
 * 
 */
function initAgenda(ngScopeObj, ngTranslateObj) {
	
	var currentLangCode = ngTranslateObj.use();
	
	if (currentLangCode == "es_MX") {
		currentLangCode = "es";
	} else if (currentLangCode == "en_US") {
		currentLangCode = "en";
	}
	
	// Obtener el valor de duracionMinimaDeCita de cualquier objeto Consultorio
	var duracionMinimaDeCita = "00:60:00";
	if (ngScopeObj.consultorios && ngScopeObj.consultorios.length > 0) {
		duracionMinimaDeCita = ngScopeObj.consultorios[0].duracionMinimaDeCita;
	}
	
	$('#calendar').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
		lang: currentLangCode,
		eventColor: '#06182E',
		eventTextColor: 'white',
		slotDuration: duracionMinimaDeCita,
		axisFormat: 'hh:mma',
		eventLimit: 2, // if true or int, show the "more" link when too many events appear
		businessHours: {
	        start: '8:00', // a start time (10am in this example)
	        end: '21:00', // an end time (6pm in this example)
	        dow: [ 0, 1, 2, 3, 4, 5, 6 ] // days of week
	    },
	    minTime : "05:00:00",
	    maxTime : "23:00:00",
		dayClick: function(date, jsEvent, view) {
	        //alert('Clicked on: ' + date.format());
	        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
	        if (view.name != "agendaDay") {
	        	$('#calendar').fullCalendar('gotoDate', date);
	        	$('#calendar').fullCalendar('changeView', 'agendaDay');
	        } else {
	        	// Si la vista actual es agendaDay, registrar una nueva cita
	        	// para la fecha y hora seleccionados
	        	var fecha = date.format("DD-MM-YYYY");
	        	var horaIni  = date.format("HH:mm");
	        	var horaFin = "0";
	        	// Buscar consultorio que corresponde a la hora seleccionada
	        	if (ngScopeObj.consultorios.length > 0) {
	        		try {
		        		var horarios = ngScopeObj.consultorios[0].horariosTodos;
		        		var weekDay = date.format("E"); // Obtener el dia de la semana
		        		var hora = horaIni.substring(0, horaIni.indexOf(':'));
		        		var idCons = horarios[parseInt(weekDay) - 1][parseInt(hora)];
		        		if (idCons != null) {
			        		var consObj = searchObjectInArray(ngScopeObj.consultorios, "idConsultorio", idCons);
			        		var minsDuracionCita = consObj.minsDuracionCita;
			        		horaFin = date.add(minsDuracionCita, 'minute').format('HH:mm');
		        		}
	        		} catch(e){
	        			console.log(e);
	        		}
	        	}
	        	// Redireccionar al registro de cita
	        	window.location = "#/regCita/0/" + fecha + "/" + horaIni + "/" + horaFin + "/0/0/0/0/0/0";
	        }
	    },
	    eventClick: function(calEvent, jsEvent, view) {
	        //alert('Event: ' + calEvent.title);
	        if (view.name != "agendaDay") {
	        	$('#calendar').fullCalendar('gotoDate', calEvent.start);
	        	$('#calendar').fullCalendar('changeView', 'agendaDay');
	        } else {
	        	// Si la vista actual es agendaDay, EDITAR la cita seleccionada
	        	var fecha   = moment(calEvent.fechaHoraInicio).format("DD-MM-YYYY");
	        	var horaIni = moment(calEvent.fechaHoraInicio).format("HH:mm");
	        	var horaFin = moment(calEvent.fechaHoraFin).format("HH:mm");
	        	// Redireccionar al registro de cita
	        	window.location = "#/regCita/" + calEvent.idCita + "/" + fecha + "/" + horaIni + "/" + horaFin +
	        				"/" + calEvent.idPaciente + "/" + calEvent.idPacienteSinCorreo +
	        				"/" + calEvent.pacienteName + "/" + getStringOrZero(calEvent.pacienteMail) + 
	        				"/" + getStringOrZero(calEvent.nota) + "/" + calEvent.registradoPor;
	        }
	    },
	    eventRender: function(calEvent, element, view) {
	    	if (view.name == "agendaWeek") {
	    		$(element).find('.fc-bg').css("background-color", "#000");
	    	}
	    	if (view.name == "agendaDay") {
	    		$(element).find('.fc-bg').css("background-color", "#000");
	    		$(element).css("text-align", "left");
	    		$(element).css("padding-left", "25px");
	    		// TODO Mostrar icono-link de registrar consulta solo cuando la fecha de la cita sea igual al dia actual
	    		element.append("<div style='z-index:10; position:relative; top:-16px; left:-24px'>" + 
	    				"<a href='#/regConsulta/0/" + calEvent.idPaciente + "/" + calEvent.idPacienteSinCorreo +
        				"/" + calEvent.pacienteName + "' style='color:#DE0000' title='" + 
	    				ngTranslateObj.instant("REGISTRAR_CONSULTA") + "'><i class='fa fa-pencil-square-o fa-2x'></i></a></div>");
	        }
	    }	
	});
	
	
	// Cargar eventos guardados en BD

	//$('#calendar').fullCalendar('removeEvents');
	//eventData = { title: title, start: '2015-07-01T10:30:00', end: '2015-07-01T12:30:00' };
	//$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
	
	callApi(1, "doctorEndpoint", "getCitas", ngTranslateObj, null, function(resp){
		var citasList = resp.obj;
		for (i=0; i < citasList.length; i++) {
			var cita = citasList[i];
			cita.title = ngTranslateObj.instant("CITA_ABREV") + ": " + cita.pacienteName +
						 (cita.pacienteTelefono? ". " + cita.pacienteTelefono : "") + ". " +
						 (cita.nota? cita.nota : "");
			cita.start = moment(cita.fechaHoraInicio).format();
			cita.end   = moment(cita.fechaHoraFin).format();
		}
		$("#calendar").fullCalendar('addEventSource', citasList);
	});
	
}

app.controller('historialController',function($scope, $translate, $rootScope, $routeParams){
	$scope.historial = {}; 
	
	$scope.historial = [
	                {fechaHora: "12/10/2015" + " - " + "12:30 a 13:00", paciente: "eleno", diagnostico: "Estado Actual", tratamiento: "Descripcion uno"},
	                {fechaHora: "05/11/2014" + " - " + "12:30 a 13:00", paciente: "pancho", diagnostico: "Estado Actual Dos", tratamiento: "Descripcion uno"},
	                {fechaHora: "31/08/2014" + " - " + "12:30 a 13:00", paciente: "tomas", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno TRES"},
	                {fechaHora: "21/05/2013" + " - " + "12:30 a 13:00", paciente: "rodigo", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno uno"},
	                {fechaHora: "16/06/2013" + " - " + "12:30 a 13:00", paciente: "angelica", diagnostico: "Estado nuevo", tratamiento: "Descripcion uno UNO"},
	                {fechaHora: "12/10/2015" + " - " + "12:30 a 13:00", paciente: "damian", diagnostico: "Estado Actual", tratamiento: "Descripcion uno"},
	                {fechaHora: "05/11/2014" + " - " + "12:30 a 13:00", paciente: "angela", diagnostico: "Estado Actual Dos", tratamiento: "Descripcion uno"},
	                {fechaHora: "31/08/2014" + " - " + "12:30 a 13:00", paciente: "rosario", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno TRES"},
	                {fechaHora: "21/05/2013" + " - " + "12:30 a 13:00", paciente: "pedro", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno uno"},
	                {fechaHora: "16/06/2013" + " - " + "12:30 a 13:00", paciente: "goillermo", diagnostico: "Estado nuevo", tratamiento: "Descripcion uno UNO"},
	                {fechaHora: "12/10/2015" + " - " + "12:30 a 13:00", paciente: "andrea", diagnostico: "Estado Actual", tratamiento: "Descripcion uno"},
	                {fechaHora: "05/11/2014" + " - " + "12:30 a 13:00", paciente: "adrian", diagnostico: "Estado Actual Dos", tratamiento: "Descripcion uno"},
	                {fechaHora: "31/08/2014" + " - " + "12:30 a 13:00", paciente: "federico", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno TRES"},
	                {fechaHora: "21/05/2013" + " - " + "12:30 a 13:00", paciente: "martin", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno uno"},
	                {fechaHora: "16/06/2013" + " - " + "12:30 a 13:00", paciente: "mario", diagnostico: "Estado nuevo", tratamiento: "Descripcion uno UNO"},
	                {fechaHora: "12/10/2015" + " - " + "12:30 a 13:00", paciente: "toño", diagnostico: "Estado Actual", tratamiento: "Descripcion uno"},
	                {fechaHora: "05/11/2014" + " - " + "12:30 a 13:00", paciente: "ramiro", diagnostico: "Estado Actual Dos", tratamiento: "Descripcion uno"},
	                {fechaHora: "31/08/2014" + " - " + "12:30 a 13:00", paciente: "jorge", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno TRES"},
	                {fechaHora: "21/05/2013" + " - " + "12:30 a 13:00", paciente: "liliana", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno uno"},
	                {fechaHora: "16/06/2013" + " - " + "12:30 a 13:00", paciente: "manuel", diagnostico: "Estado nuevo", tratamiento: "Descripcion uno UNO"},
	                {fechaHora: "12/10/2015" + " - " + "12:30 a 13:00", paciente: "lalo", diagnostico: "Estado Actual", tratamiento: "Descripcion uno"},
	                {fechaHora: "05/11/2014" + " - " + "12:30 a 13:00", paciente: "eduardo", diagnostico: "Estado Actual Dos", tratamiento: "Descripcion uno"},
	                {fechaHora: "31/08/2014" + " - " + "12:30 a 13:00", paciente: "quique", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno TRES"},
	                {fechaHora: "21/05/2013" + " - " + "12:30 a 13:00", paciente: "olivia", diagnostico: "Estado XXXXXX", tratamiento: "Descripcion uno uno"},
	                {fechaHora: "16/06/2013" + " - " + "12:30 a 13:00", paciente: "karina", diagnostico: "Estado nuevo", tratamiento: "Descripcion uno UNO"},
	                
	            ];

    
});
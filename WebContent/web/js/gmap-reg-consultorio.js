/**
 * Plugin jquery para encapsular el manejo de la API de Google Maps
 * @param $
 */
(function ($) {

    $.fn.gmap3 = function (options) {
        var defaults = {
            lat: 0.0,
            lng: 0.0,
            zoom: 4,
            navControl: true
        };
        var options = $.extend(defaults, options);

        // Allows multiple elements to be selected.
        if (this.length > 1) {
            this.each(function () { $(this).gmap(options) });
            return this;
        }

        // global var to access the google map object
        this.map;
        
        // MARCADOR GLOBAL
        this.myMarker = null;
        this.infoWindow = null;

        // valores iniciales del mapa
        this.initialize = function () {
            var latlng = new google.maps.LatLng(options.lat, options.lng);
            var settings = {
                zoom: options.zoom,
                center: latlng,
                mapTypeControl: true,
                mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DROPDOWN_MENU },
                navigationControl: options.navControl,
                navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            this.map = new google.maps.Map($(this)[0], settings);
            // Inicializar marcador myMarker
            this.myMarker = new google.maps.Marker({
                position: latlng,
                draggable: true,
                // title: "Aqui esta mi consultorio",
                map: this.map
            });
            this.infoWindow = new google.maps.InfoWindow();
            var marker1 = this.myMarker;
            var map1 = this.map;
            var infoWindow1 = this.infoWindow;
        	google.maps.event.addListener(this.myMarker, 'mouseup', function(){
        		_setMarkerByLatLng(marker1.getPosition(), 10, map1, marker1, infoWindow1);
            });
            return this;
        };

        // set map type
        this.setTypeRoadMap = function () {
            this.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        }
        this.setTypeSatellite = function () {
            this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
        }
        this.setTypeHybrid = function () {
            this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        }
        this.setTypeTerrain = function () {
            this.map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        }

        // set the map center
        this.setCenter = function (lat, lng) {
            this.map.setCenter(new google.maps.LatLng(lat, lng));
        }

        // zoom methods
        this.getZoom = function () {
            return this.map.getZoom();
        }
        this.setZoom = function (level) {
            this.map.setZoom(level);
        }

        /**
         * Set marker to the map by address
         * 
         */
        this.setMarkerByAddress = function (address, centerMapZoom) {
        	var marker1 = this.myMarker;
            var map1 = this.map;
            var infoWindow1 = this.infoWindow;
            $.fn.gmap3.geoCodeAddress(address, function (latlng) {
                return _setMarkerByLatLng(latlng, centerMapZoom, map1, marker1, infoWindow1);
            });
        }
        /**
         * Set marker to the map by lat / lng
         * 
         */
        this.setMarkerPosition = function (lat, lng, centerMapZoom) {
        	var latlng = new google.maps.LatLng(lat, lng);
            return _setMarkerByLatLng(latlng, centerMapZoom, this.map, this.myMarker, this.infoWindow);
        }
        /**
         * Show info window message
         * 
         */
        this.showInfo = function(fillDireccionInputBool) {
        	_setLatLongInfo(this.map, this.myMarker, this.infoWindow, fillDireccionInputBool);
        }

        
        // add a path to the map
        this.addPath = function (data, opts) {
            var defOpts = {
                color: "#ff0000",
                opacity: 1.0,
                strokeWeight: 2.0
            };
            var opts = $.extend(defOpts, opts);

            if (data != undefined) {

                var path = new google.maps.Polyline({
                    path: _convertData(data),
                    strokeColor: opts.color,
                    strokeOpacity: opts.opacity,
                    strokeWeight: opts.strokeWeight
                });

                path.setMap(this.map);
            }
            return this;
        }

        this.toggleDebug = function () {

            // Create new control to display latlng and coordinates under mouse.
            var latLngControl = new _latLngControl(this.map);

            // Register event listeners
            google.maps.event.addListener(this.map, 'mouseover', function (mEvent) {
                latLngControl.set('visible', true);
            });
            google.maps.event.addListener(this.map, 'mouseout', function (mEvent) {
                latLngControl.set('visible', false);
            });
            google.maps.event.addListener(this.map, 'mousemove', function (mEvent) {
                latLngControl.updatePosition(mEvent.latLng);
            });

            return this;
        }

        this.onclickReverseGeocode = function (callback) {
            geocode = google.maps.event.addListener(this.map, 'click', function (me) {
                $.fn.gmap3.geoCodeLatLng(me.latLng.lat(), me.latLng.lng(), function (address) {
                    if (callback != undefined) {
                        callback(address);
                    }
                });
            });
        }

        this.onclickGetLatLng = function (callback) {
            geocode = google.maps.event.addListener(this.map, 'click', function (me) {
                var result = [me.latLng.lat(), me.latLng.lng()];
                if (callback != undefined) {
                    callback(result);
                }
            });
        }

        
        
        /* ------------- Globals functions ------------------ */

        // Updates a registered element with the address (reverse geocode)
        $.fn.gmap3.geocoder = new google.maps.Geocoder();
        $.fn.gmap3.geoCodeLatLng = function (lat, lng, callback) {
            var latlng = new google.maps.LatLng(lat, lng);
            $.fn.gmap3.geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var str = results[0].formatted_address;
                    callback(str);
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
        }

        $.fn.gmap3.geoCodeAddress = function (address, callback) {
            $.fn.gmap3.geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (callback != undefined) {
                        callback(results[0].geometry.location);
                    }
                    else {
                        return results;
                    }
                } else {
                    alert("Geocoder failed due to: " + status);
                }
            });
        }



        /* ------------- Private functions ------------------ */

        /**
         * Asigna la posicion del marcador
         */
        function _setMarkerByLatLng(latlng, centerMapZoom, map1, marker, infoWindow) {
            
        	if (marker == null) {
        		console.log("ERROR MARCADOR NULO");
        	
        	} else {
        		marker.setPosition(latlng);
        		_setLatLongInfo(map1, marker, infoWindow, true);
        	}
        	
        	if (centerMapZoom > 0) {
        		map1.setCenter(marker.getPosition());
        		if (centerMapZoom > map1.getZoom()) {
        			map1.setZoom(centerMapZoom);
        		}
        	}
        	
            return this;
            
        }
        
        /**
         * Obtiene la posicion actual del marcador (latitud, lonfitud), obtiene la direccion (texto)
         * y lo settea en los inputs correspondientes.
         * 
         */
        function _setLatLongInfo(map1, marker, infoWindow, fillDireccionInputBool) {
        	
        	var markerLatLng = marker.getPosition();
        	$("#latitudInput").val(markerLatLng.lat());
            $("#longitudInput").val(markerLatLng.lng());
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({"latLng": markerLatLng}, function(results, status) {
            	var dirLabel = "";
                if (status == google.maps.GeocoderStatus.OK){
                    if (results[0]){
                        dirLabel = results[0].formatted_address;
                    }else{
                        dirLabel = "No se pudo obtener la direccion automaticamente.";
                    }
                }else{
                    dirLabel = "No se pudo obtener la direccion. Status: " + status;
                }
                if (fillDireccionInputBool) {
                	$("#direccionInput").val(dirLabel);
                }
                infoWindow.setContent(dirLabel);
                infoWindow.open(map1, marker);           
            });
            
        }

        // Converts array of JSON lat/lng into google array
        function _convertData(data) {
            var pts = [];
            for (var i = 0; i < data.length; i++) {
                pts[i] = new google.maps.LatLng(data[i].lat, data[i].lng);
            }
            return pts;
        }

        // Creates html that follows the mouse and displays lat/lng.
        function _latLngControl(map) {
            /**
            * Offset the control container from the mouse by this amount.
            */
            this.ANCHOR_OFFSET_ = new google.maps.Point(8, 8);

            /**
            * Pointer to the HTML container.
            */
            this.node_ = this.createHtmlNode_();

            // Add control to the map. Position is irrelevant.
            map.controls[google.maps.ControlPosition.TOP].push(this.node_);

            // Bind this OverlayView to the map so we can access MapCanvasProjection
            // to convert LatLng to Point coordinates.
            this.setMap(map);

            // Register an MVC property to indicate whether this custom control
            // is visible or hidden. Initially hide control until mouse is over map.
            this.set('visible', false);
        }

        // Extend OverlayView so we can access MapCanvasProjection.
        _latLngControl.prototype = new google.maps.OverlayView();
        _latLngControl.prototype.draw = function () { };

        _latLngControl.prototype.createHtmlNode_ = function () {
            var divNode = document.createElement('div');
            divNode.id = 'latlng-control';
            divNode.index = 100;
            return divNode;
        };

        _latLngControl.prototype.visible_changed = function () {
            this.node_.style.display = this.get('visible') ? '' : 'none';
        };

        _latLngControl.prototype.updatePosition = function (latLng) {
            var projection = this.getProjection();
            var point = projection.fromLatLngToContainerPixel(latLng);

            // Update control position to be anchored next to mouse position.
            this.node_.style.left = point.x + this.ANCHOR_OFFSET_.x + 'px';
            this.node_.style.top = point.y + this.ANCHOR_OFFSET_.y + 'px';

            // Update control to display latlng and coordinates.
            this.node_.innerHTML = [
                          latLng.toUrlValue(4),
                          '<br/>',
                          point.x,
                          'px, ',
                          point.y,
                          'px'
                        ].join('');
        };

        // Initialize the map
        return this.initialize();
    };

})(jQuery);


/*********************************************************************************************************************/


var map3 = null;

/**
 * Inicializacion del Mapa
 * @param latitud
 * @param longitud
 */
function initMap(latitud, longitud, zoom1, loadAddressBool) {
	
	// 20, -99: Centra el mapa en Mexico
	var latitud = !latitud? 20 : latitud;
	var longitud = !longitud? -99 : longitud;
	var zoom1 = !zoom1? 5 : zoom1;
	
    // Crear objeto global gmap3 para manejo del mapa
    map3 = $("#map_canvas").gmap3(
    {   
    	lat: latitud,
        lng: longitud,
        zoom: zoom1
    });
    
    // auto completa buscar
    var autocomplete = new google.maps.places.Autocomplete($("#address")[0], {});
    google.maps.event.addListener(autocomplete, 'place_changed', function() {});
    
    if (loadAddressBool) {
    	map3.showInfo(false);
    }
    
}

/**
 * Esta funcion se invoca al dar clic en el boton "Ir" del campo Buscar Direccion 
 * (o presionando ENTER en este campo).
 */
function irA() {
   var address = $("#address").val();
   if (address != undefined && address != null && address != "") {
       map3.setMarkerByAddress(address, 14);
   }
}

/**
 * Esta funcion se ejecuta al dar clic en "Ir a mi ubicacion actual".
 */
function ubicacionUsuario() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        	var latitud  = position.coords.latitude;
            var longitud = position.coords.longitude;
            var precision = position.coords.accuracy;
            map3.setMarkerPosition(latitud, longitud, 17);
              
        }, function(error) {
        	switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("Usted no acepto obtener su ubicacion.");
                    break;
                case error.POSITION_UNAVAILABLE:
                	alert("Informacion de ubicacion no disponible.");
                    break;
                case error.TIMEOUT:
                	alert("No se pudo obtener su ubicacion (tomo demasiado tiempo).");
                    break;
                case error.UNKNOWN_ERROR:
                	alert("Error inesperado, intente mas tarde por favor.")
                    break;
            }
        });
    } else { 
        alert("Geolocalizacion no soportada por su navegador.");
    }
}

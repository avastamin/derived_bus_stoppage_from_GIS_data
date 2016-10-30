var map;
var infoWindow;
var markers = [];
var bus_markers = [];
var bus_stoppages = JSON.parse(busstoppages);

// Initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: -6.8995638, lng: 39.1685532}
    });

   // Add bus stoppages on Google map
    addBusStoppage(map);

    // generate blank info object
    infoWindow = new google.maps.InfoWindow();

    // Create the legend and display on the map
    var legend = document.createElement('div');
    legend.id = 'legend';
    var content = [];
    content.push('<h3>Layer Controls</h3>');
    content.push('<div class="checkbox"><label><input type="checkbox" id="toggleRoutes" onclick="toggleRoutes(this.id)"/>Routes</label></div>');
    content.push('<div class="checkbox"><label><input type="checkbox" id="toggleBusStoppage" onclick="toggleBusStoppage(this.id)" checked/>Possible Bus Stoppages</label></div>');
    legend.innerHTML = content.join('');
    legend.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(legend);


}

/**
 * @description Manipulate popup content
 * @constructor
 * @param {object} marker - map marker
 * @param {string} popupContent - popup content
 */
function infoWindowHandler(marker, popupContent) {
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(popupContent);


        if (marker.getAnimation() !== null) {

            this.setAnimation(null);
            infoWindow.close(map, this);
        } else {
            //setTimeout(function(){ this.setAnimation(google.maps.Animation.BOUNCE); }, 750);
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function(){ marker.setAnimation(null); }, 1400);
            infoWindow.open(map, this);
        }
    });
}
/**
 * @description Add marker on google map
 * @constructor
 * @param {object} map - map object
 */
function addBusStoppage(map){
    for ( i=0; i < bus_stoppages.length; ++i){
        var location = {lat: bus_stoppages[i].geometry.coordinates[1], lng: bus_stoppages[i].geometry.coordinates[0]};
        var bus_marker = new google.maps.Marker({
          position: location,
          icon: 'static/assets/img/bus.png',
          map: map
        });

        // Get generated popup content from genPopupContent function
        var popupContent = genPopupContent(bus_stoppages[i]);

         // Call infoWindowHandler to add popup content to the marker
         infoWindowHandler(bus_marker, popupContent);

        bus_markers.push(bus_marker);
    }

    // Sets the map on all markers in the array.
    for (var i = 0; i < bus_markers.length; i++) {
      bus_markers[i].setMap(map);
    }

}

/**
 * @description Toggle bus routes on check
 * @constructor
 * @param {string} elementId - Dom element
 */
function toggleRoutes(elementId){
    var checkbox = document.getElementById(elementId);

    // read Geojson data and to render on google map
    var routes_layer = map.data;
    routes_layer.loadGeoJson('static/assets/data/routes.geojson');

    // Following if else is for toggle functionality
    if (checkbox.checked){
        routes_layer.setMap(map);
    }
    else{
        routes_layer.setMap(null);
    }
}

/**
 * @description Toggle bus stoppages on check
 * @constructor
 * @param {string} elementId - Dom element
 */
function toggleBusStoppage(elementId){
    var checkbox = document.getElementById(elementId);
    if (checkbox.checked){
         addBusStoppage(map);
      }
      else{
        addBusStoppage(null);
      }
}

/**
 * @description Generate popup content for markers
 * @constructor
 * @param {object} data 
 */
function genPopupContent(data){
        return '<table class="able table-bordered">'+
                '<thead>' +
                    '<tr>'+
                    '<td><p align="enter"><b>Attribute</b></p></td>' +
                    '<td><p align="enter"><b>Value</b></p></td>' +
                    "</tr>"+
                "</thead>"+
                "<tbody>"+
                    "<tr>"+
                    "<td>Previous Dominating Activity</td>"+
                    "<td>"+ data.properties.previous_dominating_activity + "</td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td>Previous Dominating Activity Confidence</td>"+
                    "<td>"+ data.properties.previous_dominating_activity_confidence + "</td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td>Current Dominating Activity</td>"+
                    "<td>"+ data.properties.current_dominating_activity + "</td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td>Current Dominating Activity Confidence</td>"+
                    "<td>"+ data.properties.current_dominating_activity_confidence + "</td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td>Speed</td>"+
                    "<td>"+ data.properties.speed + "</td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td>Accuracy</td>"+
                    "<td>"+ data.properties.accuracy + "</td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td>Altitude</td>"+
                    "<td>"+ data.properties.altitude + "</td>"+
                    "</tr>"+
                    "<tr>"+
                    "<td>Locations</td>"+
                    "<td>"+ 'lat:'+ data.geometry.coordinates[1] + 'lng:' + data.geometry.coordinates[0] +"</td>"+
                    "</tr>"+
                "</tbody>"+
            "</table>";
}
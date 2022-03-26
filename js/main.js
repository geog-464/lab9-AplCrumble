<!-- File created by Maxime Malot, 2022 --> 
//initialize function called when the script loads
function initialize(){
    loadMap();
};

//function to create a table with cities and their populations
function loadMap(){
 	//create a basemap style. You can find other options at https://leaflet-extras.github.io/leaflet-providers/preview/
	var CartoDB_Positron = L.tileLayer(
		'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
		{
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			subdomains: 'abcd'
		}
	)
	//add this basemap style to a JS object, to which you could also add other baselayers. This object is loaded as a basemap selector as seen further down
	var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
	});
	
	var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});
	
	var overlayMaps = {
		"ESRI World Street Map": Esri_WorldStreetMap,
		"ESRI World Imagery": Esri_WorldImagery,
		
	}
	
	var baseLayers = {
		"CartoDB": CartoDB_Positron,

	};
	// create the map
	var mymap = L.map('mapdiv', {
		center: [45.50, -73.58]
		,zoom: 3
		,maxZoom: 18
		,minZoom: 3
		,layers: [CartoDB_Positron] 
	});
		
	// parse json object (var geojsonData) and turn into loadable layer
	geojsonLayer = L.geoJSON(geojsonData);
	
	//add geojsonData to map
	geojsonLayer.addTo(mymap);// add json element to map
	
	//declare basemap selector widget
	var lcontrol = L.control.layers(baseLayers, overlayMaps);
	//add it to the map
	lcontrol.addTo(mymap);
	
};

//call the initialize function when the window has loaded
window.onload = initialize();

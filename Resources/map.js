var funcMod = require('lib/functionsModule');
var ui = require('lib/ui');

var win = Ti.UI.currentWindow;
win.backgroundColor = "#fff";
var data = win.data;				//This is the JSON array of the data that are used in in the tableview.
var currRegion = win.currRegion;		//We pass the current location here to give us a starting point.

//Internationalization variables
var int_btn_back = L('btn_back');

//Custom Back button
var btnBack = ui.mkBackButtonGrey(int_btn_back);
btnBack.addEventListener("click", function() {
    Ti.UI.currentWindow.close();
});
win.setLeftNavButton(btnBack);

Ti.API.info('data[0].name = ' + data[0].name);
Ti.API.info('data[0].lat = ' + data[0].lat);
Ti.API.info('data[0].lng = ' + data[0].lng);

//
// CREATE MAP VIEW
//
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.STANDARD_TYPE,
	region:currRegion,
	regionFit: true,
	animate:true,
	regionFit:true,
	userLocation:true
});

Ti.API.info('currRegion = ' + currRegion);
for (var i = 0; i < data.length; i++) {
	var annotation = {
		latitude:data[i].lat, 
		longitude:data[i].lng,
		title:data[i].name,
		subtitle:data[i].city+", "+data[i].state,
		image:"images/map_pin.png",	
		animate:true,
		rightButton:Titanium.UI.iPhone.SystemButton.DISCLOSURE
	}

	mapview.addAnnotation(annotation);
	//annotations.push(annotation);
}

win.add(mapview);

// map view click event listener
mapview.addEventListener('click',function(evt)
{
	var clickSource = evt.clicksource;
	var index = evt.index;
	Ti.API.info('mapview click clicksource = ' + clickSource);
	Ti.API.info('mapview click index = ' + index);
	
	if( clickSource == "rightButton" ){
		var index = evt.index;
		
		funcMod.openDetail(index);	
	}	
});
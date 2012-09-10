var win = Ti.UI.currentWindow;
win.backgroundColor = "#fff";
var currRegion = win.currRegion;		//We pass the current location here to give us a starting point.

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

win.add(mapview);

var funcMod = require('lib/functionsModule');
var mathMod = require('lib/mathModule');
var ui = require('lib/ui');

/*
We add the simulator here to set the window properly. This is done throughout this file to maintain seperation from device and emulator,
most items can be testing in the simulator prior to device to help speed up development.
*/
var win = Ti.UI.currentWindow;
win.backgroundColor = "#fff";
var data = win.data;				//This is the JSON array of the locations that are used in in the tableview.
var currLocation = win.currLocation;		//We pass the current location here to give us a starting point.
var currBearing = 0; 					//Current bearing of the device.
var ok = false;				//This variable will dictate the setInterval based on if the heading is firing.
var viewAngleX = mathMod.ToRad(15);			//This is an estimation of the total viewing angle that you see.
var locViews = [];					//All of the locations are stored in views. The views are stored into this array
var maxDist = 0;					//The maxDist is used to layout all of the radar points properly
var displayCaps = Ti.Platform.displayCaps;	//This is for the width & height of the device the other two variables get the center
var centerX = displayCaps.platformWidth/2;	
var centerY = displayCaps.platformHeight/2;	

//This creates the overlay for the camera
var overlayView = Ti.UI.createView();

//Internationalization variables
var int_btn_back = L('btn_back');

/* ****************************** */
/* Create Navbar with Back Button */
/* ****************************** */
var navBar = ui.mkbarGrey();
navBar.top=0;

//create and insert back button
var btnClose = ui.mkBackButtonGrey(int_btn_back);

btnClose.addEventListener('click', function() { 
	//This simulation component either closes the modal view or removes the camera. Nothing complex here.
	if (Ti.Platform.model == "Simulator") {
		win.close(); 
	} else {
		Ti.Media.hideCamera();
		win.close();
	}
});

var imgLogo = Ti.UI.createImageView({
	image: "images/logo-small.png",
	width: 45,
	height: 33
});

navBar.add(btnClose);
navBar.add(imgLogo);
overlayView.add(navBar);

/* *********************************************************************** */
/* This initial loop creates the views that we see in the camera. It contains
 * some simple logic to show only items that are not null. Since not all of 
 * the items have addresses, we do not show some of those. 				   */
/* *********************************************************************** */
for (var i = 0; i < data.length; i++) {
	//Ti.API.info("data.length AR: "+data.length);
	/*
	Based on the distance we set the opacity & scale of the entire location.
	This is done based on the distance of the items in an if then statement.
	*/
	var dist 	= mathMod.Distance(currLocation, data[i]);
	//var opacity = ((1/dist) > 0.8) ? 0.8 : (1/dist).toFixed(2);
	var opacity = 1;
	var scale 	= ((1/dist) > 0.9 ) ? 0.75 : (1/dist).toFixed(2);	//Scale is set here, smaller based on distance.
	var tmatrix = Ti.UI.create2DMatrix().scale(scale);				//We set the scale here to avoid "flashes" when rotating
	var horizAngle = mathMod.Bearing(currLocation, data[i]);		
	
	//This little section here will help with the poltting of our radar view.
	//We need to establish the max distance for the plotting to work properly.
	if (dist > maxDist) {
		maxDist = dist;
	}
	
	var viewPlace = Ti.UI.createView({
		height: 55,
		width: 207,
		x: 0,
		name: data[i].name,
		loc: {lat:data[i].lat, lng:data[i].lng},
		opacity: opacity,
		scale: scale,
		top: 150,
		transform: tmatrix
	});
	
	//Ti.API.info("name: "+data[i].name+", lat: "+data[i].lat+", lng: "+data[i].lng);
	
	var bkgLocView = Ti.UI.createButton({
		height: 55,
		width: 207,
		borderRadius: 10,
		opacity: 0.95,
		backgroundImage: "images/bg_result_ar.png",
		index:i
	});

	//Ti.API.info("id: "+data[i].id);
		
	bkgLocView.addEventListener("click", function(e) {
		if (Ti.Platform.model == "Simulator") {
			win.close(); 
			win.fireEvent("winDetail", {index:e.source.index});
		} else {
			Ti.Media.hideCamera();
			win.close();			
			win.fireEvent("winDetail", {index:e.source.index});
		}
	});
	viewPlace.add(bkgLocView);
	
	var msgNameLbl = Ti.UI.createLabel({
		text: data[i].name,
		color: "#23353b",
		textAlign: "left",
		width: 165,
		top: 4,
		left: 8,
		font: {fontSize: 13, fontFamily:"HelveticaNeue-Bold"},
		height: 20
	});
	viewPlace.add(msgNameLbl);
	
	Ti.API.info("rating_small: "+data[i].rating_large);
	
	var imgArrow = Ti.UI.createImageView({
		image: "images/icn_arrow_white.png",
		width: 9,
		height: 15,
		top: 15,
		right: 10
	});
	viewPlace.add(imgArrow);
			
	if (data[i].rating_large != null) {
		var imgRating = Ti.UI.createImageView({
			image: data[i].rating_large,
			width: 83,
			height: 15,
			top: 22,
			left: 8
		});
		viewPlace.add(imgRating);
	}
	
	if (data[i].categories != null) {
		var categoriesArry = (data[i].categories.toString()).split(',');
		var categories = categoriesArry[0];
		//Ti.API.info("***categories: "+categories);

		var lblCategories = Ti.UI.createLabel({
			text: categories,
			color: "#23353b",
			textAlign: "left",
			width: "auto",
			height: "auto",
			top: 38,
			left: 9,
			font: {fontSize: 10, fontFamily:"HelveticaNeue"}
		});
		viewPlace.add(lblCategories);
	}

	//distance label
	var dist = data[i].distance;
	dist = funcMod.addCommas( dist.toFixed(2) ); //fix to two decimal places
		
	var lblDistance = Ti.UI.createLabel({
		text: dist+" mi",
		color: "#23353b",
		textAlign: "left",
		width: "auto",
		height: "auto",
		top: 35,
		right: 6,
		font: {fontSize: 10, fontFamily:"HelveticaNeue"}
	});
	viewPlace.add(lblDistance);
	
	viewPlace.hide();	
	overlayView.add(viewPlace);
	locViews.push(viewPlace);
};

/* ****************************************************************** */
/* The following views and buttons are set here for the "radar" view
 * that is in the top right corner of the screen the circleView
 * holds all of the points that then get rotated based on the heading */
/* ****************************************************************** */
var targetView = Ti.UI.createView({
	height: 103,
	width: 98,
	top: 50,
	right: 11
});

var targetImg = Ti.UI.createButton({
	backgroundImage: "images/target.png",
	height: 103,
	width: 99,
	//opacity: 0.8,
	touchEnabled: false
});

var circleView = Ti.UI.createView({
	height: 60,
	width: 60,
	borderRadius: 30,
	top: 70,
	right: 30,
	opacity: 0.5
});
targetView.add(targetImg);
overlayView.add(targetView);
overlayView.add(circleView);

/* ******************************************************************************* */
/* This function adds all of the radar points onto the screen in their appropriate
 * positions. Earlier we calculated the maxDist so that these will plot properly.
 * This gets run only once when the AR view is opened.							   */
/* ******************************************************************************* */
function MapLocations() {	
	for (var i = 0; i < data.length; i++) {
		var dist = mathMod.Distance(currLocation, data[i]);
		var horizAngle = mathMod.Bearing(currLocation, data[i]);
		
		var ro = 28 * dist / maxDist;
		var centerX = 28 + ro * Math.sin(horizAngle);
		var centerY = 28 - ro * Math.cos(horizAngle);

		var circView = Ti.UI.createView({
			height: 4,
			width: 4,
			backgroundColor: "#fff",
			borderRadius: 2,
			top: centerY - 2,
			left: centerX - 2
		});
		circleView.add(circView);
	}
};

/* ******************************************************************************* */
/* UpdateView controls what views are currently on the screen and what is hidden.
 * From there it runs an additional function to dictate order on screen, and
 * movement from right to left and left to right.						   		   */
/* ******************************************************************************* */
function UpdateView() {
	var onScreen = [];	//This array will hold the views that are actively on the viewable area of the screen
	
	for (var i = 0; i < data.length; i++) {
		var horizAngle = mathMod.Bearing(currLocation, data[i]);
		var dist = mathMod.Distance(currLocation, data[i]);
		var relAngleH = horizAngle - currBearing;
		
		//This handy code cuts out a lot of overprocessing
		if (mathMod.ToDeg(relAngleH) >= 90 && mathMod.ToDeg(relAngleH) <= 270) {
			continue;
		}
		
		var xDelta = mathMod.ComputeXDelta(relAngleH);
		var viewCenterX = xDelta * centerX + centerX;
		locViews[i].x = viewCenterX - 130;
		
		//This checks the right and left of the screen to see if the view is visible.
        if (locViews[i].x > displayCaps.platformWidth + 130 || (locViews[i].x + 130) < -229) {
            locViews[i].hide();
        } else {
			onScreen.push(locViews[i]);
            locViews[i].show();
        }
	}
	
	//This does all the hard work :) Pay attention here!
	/*
	All elements on screen now get a revised matrix for placement. They also
	get rerun through the various math functions. This is seperated out
	to give order to the items on screen. Otherise we would have a ton of overlay.
	I'm sure there is room for improvement here, but this is a great start.
	*/
	for (var j= 0; j < onScreen.length; j++) {			
		var totalDeep 		= 1;	//This variable determines how var to layer the items on the screen	
		var horizAngle1 	= mathMod.Bearing(currLocation, onScreen[j].loc);
		var relAngleH1 		= horizAngle1 - currBearing;
		var xDelta1 		= mathMod.ComputeXDelta(relAngleH1);
		var viewCenterX1	= xDelta1 * centerX + centerX;	//This is related to the global centerX & Y
		
		var t = Ti.UI.create2DMatrix();/*.scale(onScreen[j].scale)*/ //Grab the scale variable that we stored earlier
			t.tx = viewCenterX1 - 130;	//This sets our left and right movements
		
		onScreen[j].x = viewCenterX1;	//This helps with the comparison in the following conditionals
				
		for (var k=0; k < onScreen.length; k++) {
			if (viewCenterX1 == onScreen[k].x) {
				break;
			} else {
				/*
				This loop with the conditional looks for overlap on the location views. If it overlays, it adds 55px to the 
				overlaped one and pushes it down. Improvement here could be to cap the limit, tie this in with 
				the accelerometer, and also reset it. This is an area for performance improvements, but
				gives a simple example of what can be done for quick sorting.
				*/
				if ((onScreen[k].x < onScreen[j].x + 229) || (onScreen[k].x > onScreen[j].x - 229)) {	
						var ty = 55 * totalDeep;
							t.ty = ty;
						totalDeep++;
					} else {
						t.ty = 0;
						totalDeep--;
					}
	
				}				
		}
		//We perform the transformation after all of that!
		onScreen[j].transform = t;
	}
};


/* **************************************** */
/* Create all the radar blips on the screen */
/* **************************************** */
MapLocations();

if (Ti.Platform.model == "Simulator") {
	//Add a slider if we are in the simulator
	var slider = Ti.UI.createSlider({
		min: 0,
		max: 10,
		value: 0,
		width: 300,
		bottom: 20
	});
	
	slider.addEventListener("change", function(e) {
		currBearing = mathMod.ToRad(e.value * 36);
		//Ti.API.info("currBearing: "+currBearing);
		UpdateView();	
		circleView.transform = Ti.UI.create2DMatrix().rotate(mathMod.ToDeg(-currBearing));
	});
		
	overlayView.add(slider);
	win.add(overlayView);
	
} else {
	//Create the heading event to monitor the direction we are facing
	Ti.Geolocation.addEventListener("heading", function(e) {
		currBearing = mathMod.ToRad(e.heading.magneticHeading);
		ok = true;
	});
	
	//This is the update for moving all of the elements on the screen and rotating the radar screen	
	setInterval(function() {
		if (!ok) {
			return;
		} 
		UpdateView();
		circleView.transform = Ti.UI.create2DMatrix().rotate(mathMod.ToDeg(-currBearing));
	}, 50);
	
		
	 //This is the last part of the puzzle, launch the camera and add the overlayView!
	 Ti.Media.showCamera({
	    success:function(event) {},
	    cancel:function() {},
	    error:function(error) {
	        var a = Titanium.UI.createAlertDialog({title:'Camera'});
	        if (error.code == Titanium.Media.NO_CAMERA) {
	            a.setMessage('Please run this test on device');
	        } else {
	            a.setMessage('Unexpected error: ' + error.code);
	        }
	        a.show();
	    },
	    overlay:overlayView,
	    showControls:false,	// don't show system control
	    autohide:false 	// tell the system not to auto-hide and we'll do it ourself
	});
}
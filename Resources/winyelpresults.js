var math = require('lib/mathModule');
var funcMod = require('lib/functionsModule');
var ui = require('lib/ui');

var win = Ti.UI.currentWindow;
win.backgroundColor = "#fff";
var data = win.data;
var currRegion = win.currRegion;		//We pass the current location here to give us a starting point.

//Internationalization variables
var int_btn_back = L('btn_back');
var int_title_map = L('title_map');

//Custom Back button
var btnBack = ui.mkBackButtonGrey(int_btn_back);
btnBack.addEventListener("click", function() {
    Ti.UI.currentWindow.close();
});
win.setLeftNavButton(btnBack);

/* ***************************** */
/* Create the Map and AR buttons */
/* ***************************** */
var buttonObjects = [
	{image:'images/icn_map.png', width:35},
	{image:'images/icn_ar.png', width:35}
];

var btnBar = Titanium.UI.createButtonBar({
	labels:buttonObjects,
	backgroundColor:'#bfc6b6',
	top:100,
	style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	height:35,
	width:'auto'	
});
win.setRightNavButton(btnBar);

//What to do when clicking on one of the Map or AR buttons.
btnBar.addEventListener('click', function(e)
{	
	//Ti.API.info(e.index);
	Ti.API.info("currRegion.latitude: "+currRegion.latitude);
	viewActInd.visible = true;
	
	// open Map
	if (e.index == 0)
	{
		var winMap = Ti.UI.createWindow({
			url: "map.js",
			data: win.data,
			title: int_title_map,
			//backButtonTitle: "Back",
			barImage: "images/bg_bargrey.png",
			leftNavButton: btnBack,
			currRegion: win.currRegion
		});
		
		Ti.UI.currentTab.open(winMap);
		viewActInd.visible = false;
	}
	// create and open Augmented Reality Window
	else if (e.index == 1)
	{
		var winAr = Ti.UI.createWindow({
			url: "cameraar.js",
			backgroundColor: "#000",
			backgroundImage: "images/sim-bkg.png",
			data: win.data,
			navBarHidden: true,
			leftNavButton: btnBack,
			currLocation: win.currLocation
		});
		winAr.open();
		
		winAr.addEventListener("winDetail", function(e) {
			Ti.API.info(e.index);
			funcMod.openDetail(e.index);
		});

		//when the window finished opening
		winAr.addEventListener("open", function(e) {
			viewActInd.visible = false;
		});
	}	
});

/* *************************************** */
/* Set up tableview for the results window */
/* *************************************** */
var tv = Ti.UI.createTableView({
	backgroundColor: "transparent"
});
win.add(tv);

//go through each result and create labels
for (var i=0; i < data.length; i++) {
	var row = Ti.UI.createTableViewRow({
		name: data[i].name,
		data: data[i],
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		height: 56
	});
	
	//alternate background
	if( (i%2) == 0){
		var bgColor = "#fff";
	}else{
		var bgColor = "#fafafa";
	}	
	var viewBkg = Ti.UI.createView({
		width: "100%",
		height: "100%",
		backgroundColor: bgColor
	});
	
	var lblTitle = Ti.UI.createLabel({
		text: data[i].name,
		left: 7,
		top: 5,
		width: 280,
		height: 20,
		color: "#000",
		font: {fontSize: 18, fontFamily: "HelveticaNeue-Bold"}
	});
	
	var street = (data[i].street == null) ? "" : data[i].street;
	var city = (data[i].city == null) ? "" : data[i].city;
	var state = (data[i].state == null) ? "" : data[i].state;
	var zip = (data[i].zip == null) ? "" : data[i].zip;
		
	var spacer = " ";
	if ((city != "") && (state != "")) {
		spacer = ", ";
	}
	
	var lblAddress = Ti.UI.createLabel({
		text: street+"\n"+city+spacer+state+" "+zip,
		left: 7,
		bottom: 3,
		width: 280,
		height: 26,
		color: "#58595B",
		font: {fontSize: 9, fontFamily: "HelveticaNeue"}
	});
	
	var dist = data[i].distance;
	dist = funcMod.addCommas(dist.toFixed(2)); //fix to two decimal places
	//Ti.API.info("dist: "+dist);
		
	var lblDist = Ti.UI.createLabel({
		text: dist+" mi.",
		width: 100,
		height: 18,
		right: 42,
		textAlign: "right",
		color: "#58595B",
		font: {fontSize: 9, fontFamily: "HelveticaNeue"},
		bottom: 2
	});
	
	var imgHasChild = Ti.UI.createImageView({
		image: "images/btn_arrow_blue.png",
		width: 19,
		height: 46,
		top: 5,
		right:6
	});
		
	row.add(viewBkg);
	row.add(lblTitle);
	row.add(lblAddress);
	row.add(lblDist);
	row.add(imgHasChild);
	tv.appendRow(row);
}

/* **************************** */
/* The yelp display requirement */
/* **************************** */
var yelpView = Ti.UI.createView({
	//backgroundColor: "#ececec",
	backgroundImage: "images/bg_yelp_bar.png",
	height: 37,
	width: "100%",
	bottom: 0
});

var yelpImage = Ti.UI.createImageView({
	image: "images/logo_yelp.png",
	width: 143,
	height: 28
});

yelpImage.addEventListener("click", function(e) {
	var webview = Titanium.UI.createWebView({url:"http://www.yelp.com"});
	var windowWeb = Titanium.UI.createWindow({
		title: "Yelp",
		backButtonTitle: "Back",
		barColor: "#2b2e2f",
		//leftNavButton: btnBack,
		barImage: "images/bg_bargrey.png"
	});
	windowWeb.add(webview);
	Ti.UI.currentTab.open(windowWeb);
});


yelpView.add(yelpImage);
win.add(yelpView);


/* ********************** */
/* The activity indicator */
/* ********************** */
var viewActInd = Ti.UI.createView({
	width: 100,
	height: 100,
	visible: false
});

var viewActIndBkg = Ti.UI.createView({
	backgroundColor: "#000",
	width: 100,
	height: 100,
	borderRadius: 14,
	opacity: 0.8
});

var actInd = Ti.UI.createActivityIndicator({
	height:50,
	width:10,
	style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG
});

tv.addEventListener("click", function(e) {
	viewActInd.visible = true;
	var index = e.index;
	var section = e.section;
	var row = e.row;
	var rowdata = e.rowData;
	
	funcMod.openDetail(index);
	viewActInd.visible = false;
});

//This is the activity view adding to the main window
win.add(viewActInd);
viewActInd.add(viewActIndBkg);
viewActInd.add(actInd);
actInd.show();	//we have to call show otherwise the spinner won't show
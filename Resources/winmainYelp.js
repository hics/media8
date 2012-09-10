var ui = require('lib/ui');

var win = Ti.UI.currentWindow;
var centerLoc; //This is our center location based on geolocation
var latitude = 0;
var longitude = 0;
var currLocation = {lat:0, lng:0}; 	//Out initial latitude and longitude that will be passed up to ensure that we always ahve something for the AR
var currRegion = {latitude:0,longitude:0,animate:true,latitudeDelta:0.01, longitudeDelta:0.01}; //for our Maps

//Internationalization variables
var int_btn_back = L('btn_back');
var int_img_logolarge = L('img_logolarge');
var int_btn_nearby = L('btn_nearby');
var int_loading = L('loading');
var int_mapit = L('mapit');
var int_yourlocation = L('yourlocation');
var int_wearesorry = L('wearesorry');
var int_enableinternet = L('enableinternet');
var int_noconnection1 = L('noconnection1');
var int_noconnection2 = L('noconnection2');
var int_nolocation1 = L('nolocation1');
var int_nolocation2 = L('nolocation2');
var int_place_msg1 = L('place_msg1');
var int_place_msg2 = L('place_msg2');

//Custom Back button
var btnBack = ui.mkBackButtonGrey(int_btn_back);
btnBack.addEventListener("click", function() {
    Ti.UI.currentWindow.close();
});
win.setLeftNavButton(btnBack);

//Placed logo
var imgLogo = Ti.UI.createImageView({
	image: int_img_logolarge,
	width: 179,
	height: 126,
	top: 85
});
win.add(imgLogo);

//Create the activity indicator.
var viewActInd = ui.mkActIndicator();

//The adds are placed at the bottom to ensure that they are on top of everything in the window.
//This completes the activity indicator section

//Create the  button that will search places for the locations


var btnNearMe = Ti.UI.createButton({
	title: "",
	backgroundImage: int_btn_nearby,
	width: 278,
	height: 45,
	enabled: false,
	top: 260
});

//This simplifies the call to enabled and disable the button for clicking and loading
function EnableDisable(enabled) {
	btnNearMe.enabled = enabled;
}

//The add event listener here is added at this point to prevent warnings in the console.
btnNearMe.addEventListener("click", function(e) {
	viewActInd.visible = true;
	getCategories();
	//EnableDisable(false);
});
win.add(btnNearMe);


//Create the intro lables to direct what a user is supost to do.
var imgLocation = Ti.UI.createImageView({
	image:  "images/arrow_userlocation.png",
	width: 21,
	height: 22,
	top: 316,
	left: 80,
	visible: false
});
win.add(imgLocation);

var lblDirTitle = Ti.UI.createLabel({
	text: int_loading,
	width: 280,
	height: "auto",
	top: 318,
	textAlign: "center",
	color: "#3c6100",
	font: {fontSize: 20, fontFamily: "FuturaStd-Light", color:"#3c6100"},
	shadowColor: "#93cd2b",
	shadowOffset: {x:0,y:1}
});
win.add(lblDirTitle);

var lblAddress = Ti.UI.createLabel({
	text: "",
	width: 280,
	height: "auto",
	top: 344,
	//top: 318+lblDirTitle.height+lblMapIt.height,
	textAlign: "center",
	color: "#333333",
	font: {fontSize: 12, fontFamily: "HelveticaNeue", fontWeight: "bold", color:"#333333"},
	shadowColor: "#93cd2b",
	shadowOffset: {x:0,y:1}
});
win.add(lblAddress);

var lblMapIt = Ti.UI.createLabel({
	text: int_mapit,
	width: 280,
	height: "auto",
	//top: 382,
	//top: 318+lblDirTitle.height,
	top: 323,
	left: 110,
	textAlign: "center",
	color: "#006699",
	font: {fontSize: 12, fontFamily: "HelveticaNeue-Bold", fontWeight: "bold"},
	shadowColor: "#93cd2b",
	shadowOffset: {x:0,y:1},
	visible: false
});
win.add(lblMapIt);

//show map of current location
lblMapIt.addEventListener("click", function(e) {
	viewActInd.visible = true;
	
	var winMap = Ti.UI.createWindow({
		url: "map_userlocation.js",
		title: int_yourlocation,
		backButtonTitle: "Back",
		barColor: "#045cb0",
		//currRegion: win.currRegion,
		currRegion: {latitude:latitude, longitude:longitude, latitudeDelta:0.03, longitudeDelta:0.03},
		navBarHidden: false
	});
	
	Ti.UI.currentTab.open(winMap);
	
	viewActInd.visible = false;	
});

//Perform some geolocation logic to get our location or determine if locations services are enabled
Ti.App.addEventListener('runGeoFunction', function(e){
	doGeolocation();
});

doGeolocation();
function doGeolocation(){
	var network = Titanium.Network;	
	
	// NETWORK CONNECTION CHECK
	if (network.online == false) {
		var a = Titanium.UI.createAlertDialog({
			title:int_wearesorry,
			message:int_enableinternet
		});
		a.show();

		a.addEventListener('click', function(e)
		{
			lblDirTitle.text = int_noconnection1;
			lblAddress.text = int_noconnection1
		});
	}else if (Titanium.Geolocation.locationServicesEnabled==false){
		//Titanium.UI.createAlertDialog({title:'We are Sorry!', message:'You need to enable locations in your settings to view this section.'}).show();
		//lblDirTitle.text = "You need to enable locations in your settings to view this section.";
		var a = Titanium.UI.createAlertDialog({
			title:int_wearesorry,
			message:int_nolocation2
		});
		a.show();

		a.addEventListener('click', function(e)
		{
			lblDirTitle.text = int_nolocation1;
			lblAddress.text = int_nolocation2
		});
	}
	else{
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
		Titanium.Geolocation.distanceFilter = 10;
		Titanium.Geolocation.getCurrentPosition(function(e){
			if (e.error){
			    return;
			}else{
				//Real geolocation
				latitude = e.coords.latitude;
				longitude = e.coords.longitude;
				
				//TEST location: Isla verde, Puerto Rico
				//latitude = "18.4429948";
				//longitude = "-66.0196843";
				
				//latitude = "18.4383133411033";
				//longitude = "-66.0067398207136";
				
				//****************************
				//TEST location: San Juan Antiguo, Puerto Rico
				//latitude = "18.4659421";
				//longitude = "-66.1181368";
				
				//latitude = "18.2022880471493";
				//longitude = "-66.5779834245174";
				//****************************
				//TEST location: Condado, Puerto Rico
				//latitude = "18.4522226311256";
				//longitude = "-66.0840184771701";
				
				//latitude = "18.466170";
				//longitude = "-66.106654";
				//****************************
				//TEST location: guaynabo, Puerto Rico
				//latitude = "18.3671675902276";
				//longitude = "-66.1090156846672";
				
				//latitude = "18.366724";
				//longitude = "-66.11755";
				//****************************
				//TEST location: carolina, Puerto Rico
				//latitude = "18.2022880471493";
				//longitude = "-66.5779834245174";
				
				//latitude = "18.442644";
				//longitude = "-66.023135";
				//****************************				
				
				//****************************
				//****************************
				
				center = latitude+","+longitude;
				currLocation = {lat: latitude, lng:longitude};
				currRegion = {latitude: latitude,longitude: longitude,animate:true,latitudeDelta:0.1, longitudeDelta:0.1};
					
				Ti.Geolocation.reverseGeocoder(latitude, longitude, function(e) {
					//*********
					//*Get data
					//*********
					var places = e.places[0];
					var address = places.street ? places.street : places.address;
					var addressArray = (places.address).split(',');
					var addressText;
					Ti.API.info("places.address: "+places.address);
					//Titanium.UI.createAlertDialog({title:'places.address', message:places.address}).show();

					//*************************
					//Re-structure address text
					//*************************
					for(i=0; i < addressArray.length; i++){
						Ti.API.info("i: "+i+"---addressArray.length: "+addressArray.length);
						
						if(i==0){//put the first part at the top
							addressText = addressArray[i]+"\n";
						}else if(addressArray[i] != " "){ //if text has something to add, put it.
							if(addressArray.length == i+1){ //if it's the piece, don't add the coma at the end.
								addressText += addressArray[i];
							}else{
								addressText += addressArray[i]+", ";
							}
						}//
					}
					
					//Titanium.UI.createAlertDialog({title:'places.address', message:places.address.indexOf("PR")}).show();
					//Titanium.UI.createAlertDialog({title:'places.address', message:places.address.indexOf("Puerto Rico")}).show();
					//****************************************************************
					//From Address, determine if the string PR or Puerto Rico is shown
					//****************************************************************
					//if "PR" or "Puerto Rico" is not found on the whole address then user is not in Puerto Rico
					if( (places.address.indexOf("PR") == -1) && (places.address.indexOf("Puerto Rico") == -1) && (win.enableLoc == false) ){
						//Not in Puerto Rico, Nearby should not work outside of Puerto Rico
						lblDirTitle.text = int_wearesorry;
						lblAddress.text = int_place_msg1;
						
						//show address for debug purposes
						//Titanium.UI.createAlertDialog({title:'places.address', message:places.address}).show();
					}else{				
						imgLocation.visible = true;
						lblMapIt.visible = true;
						lblDirTitle.text = int_place_msg2;
						lblAddress.text = addressText;//places.address;
						EnableDisable(true);
						
						//show address for debug purposes
						//Titanium.UI.createAlertDialog({title:'places.address', message:places.address}).show();						
					}
				});//Ti.Geolocation.reverseGeocoder
			}//else		
	    });
	}
}//doGeolocation()

var int_categories = L('categories');

//make the actual request and get the site's response
function getCategories(){
	var titleLabel = Titanium.UI.createLabel({
		text:int_categories,
		textAlign:"center",
		color:"#23353b",
		font: {fontSize: 14, fontFamily: "Helvetica Neue", color:"#23353b", fontWeight:"bold"},
		shadowColor: "#f5f9ef",
		shadowOffset: {x:0,y:1}
	});	
	
	var winCategories = Ti.UI.createWindow({
		url: "winCategories.js",
		title: int_categories,
		//data: data,
		//barColor: "#045cb0",
		barImage: "images/bg_bargrey.png",
		currLocation: currLocation,
		currRegion: currRegion,
		distance: win.distance,
		leftNavButton: btnBack,
		navBarHidden: false
	});
	winCategories.setTitleControl(titleLabel);

	Ti.UI.currentTab.open(winCategories);	
	viewActInd.visible = false;
}

//This is the activity view adding to the main window
win.add(viewActInd);
viewActInd.children[1].show();	//we have to call show otherwise the spinner won't show
